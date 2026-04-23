'use client';

import { useState } from 'react';
import { Copy, Check, Lock } from 'lucide-react';
import { CATEGORIES, type Prompt } from '@/lib/prompts';

interface Props {
  prompt: Prompt;
  onSelect: (p: Prompt) => void;
}

export function PromptCard({ prompt, onSelect }: Props) {
  const [copied, setCopied] = useState(false);
  const cat = CATEGORIES[prompt.category];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (prompt.isPro) return;
    navigator.clipboard.writeText(prompt.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      onClick={() => onSelect(prompt)}
      className="group relative bg-brand-dark-card border border-brand-dark-border rounded-xl p-5 cursor-pointer hover:border-brand-purple/50 hover:shadow-lg hover:shadow-brand-purple/10 transition-all"
    >
      {/* Category + Pro badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
        </span>
        {prompt.isPro && (
          <span className="flex items-center gap-1 bg-brand-purple/20 text-brand-purple text-xs px-2 py-0.5 rounded-full font-medium">
            <Lock className="w-3 h-3" />
            Pro
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-100 mb-1.5 group-hover:text-white transition-colors">
        {prompt.title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{prompt.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {prompt.tags.map((tag) => (
          <span key={tag} className="text-xs bg-brand-dark-border text-gray-400 px-2 py-0.5 rounded-md">
            #{tag}
          </span>
        ))}
      </div>

      {/* Prompt preview */}
      <div className="relative bg-black/30 rounded-lg p-3 mb-3 overflow-hidden max-h-20">
        <pre className="text-xs text-gray-500 font-mono whitespace-pre-wrap leading-relaxed line-clamp-3">
          {prompt.isPro ? '████ ██████ █████ ████ ██ ████████...' : prompt.prompt.slice(0, 120) + '...'}
        </pre>
        {!prompt.isPro && (
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-brand-dark-card to-transparent" />
        )}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
          prompt.isPro
            ? 'bg-brand-purple/10 text-brand-purple/50 cursor-not-allowed'
            : copied
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20'
        }`}
      >
        {copied ? (
          <><Check className="w-4 h-4" /> הועתק!</>
        ) : prompt.isPro ? (
          <><Lock className="w-4 h-4" /> Pro בלבד</>
        ) : (
          <><Copy className="w-4 h-4" /> העתק פרומפט</>
        )}
      </button>
    </div>
  );
}
