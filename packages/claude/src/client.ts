import Anthropic from '@anthropic-ai/sdk';
import type { z } from 'zod';
import { CLAUDE_MODEL } from './constants';

export type ClaudeClient = Anthropic;

export function createClaudeClient(apiKey?: string): ClaudeClient {
  const key = apiKey ?? process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY is not set');
  return new Anthropic({ apiKey: key });
}

export interface CallOptions {
  system?: string;
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  cacheSystem?: boolean;
}

export async function callClaude(
  client: ClaudeClient,
  options: CallOptions,
): Promise<string> {
  const { system, prompt, model = CLAUDE_MODEL, maxTokens = 4096, temperature = 0.7, cacheSystem = true } = options;

  const systemBlocks = system
    ? [{ type: 'text' as const, text: system, ...(cacheSystem ? { cache_control: { type: 'ephemeral' as const } } : {}) }]
    : undefined;

  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    temperature,
    system: systemBlocks,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('\n');

  return text;
}

export interface JSONCallOptions<T> extends CallOptions {
  schema: z.ZodSchema<T>;
}

export async function callClaudeJSON<T>(
  client: ClaudeClient,
  options: JSONCallOptions<T>,
): Promise<T> {
  const jsonPrompt = `${options.prompt}\n\nרשום תשובה רק כ-JSON תקני, ללא טקסט נוסף לפני או אחרי. ללא code fences.`;
  const text = await callClaude(client, { ...options, prompt: jsonPrompt, temperature: options.temperature ?? 0.3 });

  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Claude returned invalid JSON: ${cleaned.slice(0, 200)}`);
  }

  return options.schema.parse(parsed);
}
