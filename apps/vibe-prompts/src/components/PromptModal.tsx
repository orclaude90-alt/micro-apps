'use client';

import { useState, useEffect } from 'react';
import { X, Copy, Check, Lock } from 'lucide-react';
import { CATEGORIES, type Prompt } from '@/lib/prompts';

interface Props { prompt: Prompt | null; onClose: () => void; }

export function PromptModal({ prompt, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!prompt) return;
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prompt, onClose]);

  if (!prompt) return null;
  const cat = CATEGORIES[prompt.category];

  const handleCopy = () => {
    if (prompt.isPro) return;
    navigator.clipboard.writeText(prompt.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-brand-dark-card border border-brand-dark-border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-brand-dark-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span>{cat.emoji}</span>
              <span className="text-xs text-gray-500">{cat.label}</span>
              {prompt.isPro && (
                <span className="flex items-center gap-1 bg-brand-purple/20 text-brand-purple text-xs px-2 py-0.5 rounded-full">
                  <Lock className="w-3 h-3" /> Pro
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white">{prompt.title}</h2>
            <p className="text-sm text-gray-400 mt-0.5">{prompt.description}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors ms-4 mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {prompt.isPro ? (
            <div className="text-center py-12 space-y-4">
              <Lock className="w-12 h-12 text-brand-purple/40 mx-auto" />
              <p className="text-gray-400">הפרומפט הזה זמין בגרסת Pro בלבד</p>
              <button className="px-6 py-3 bg-brand-purple text-white rounded-xl font-medium hover:bg-purple-600 transition-colors">
                שדרג ל-Pro — $9 פעם אחת
              </button>
            </div>
          ) : (
            <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed bg-black/30 rounded-xl p-4">
              {prompt.prompt}
            </pre>
          )}
        </div>

        {/* Footer */}
        {!prompt.isPro && (
          <div className="p-6 border-t border-brand-dark-border">
            <button
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-brand-purple text-white hover:bg-purple-600'
              }`}
            >
              {copied ? <><Check className="w-4 h-4" /> הועתק לקליפבורד!</> : <><Copy className="w-4 h-4" /> העתק פרומפט מלא</>}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              הדבק ב-Claude Code, Cursor, v0, bolt.new, או Lovable
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
