'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { PROMPTS, CATEGORIES, getPromptsByCategory, searchPrompts, type Category, type Prompt } from '@/lib/prompts';
import { PromptCard } from './PromptCard';
import { PromptModal } from './PromptModal';

export function Library() {
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Prompt | null>(null);

  const results = useMemo(() => {
    if (query.trim()) return searchPrompts(query);
    return getPromptsByCategory(category);
  }, [category, query]);

  const freeCount = PROMPTS.filter((p) => !p.isPro).length;

  return (
    <>
      {/* Search + stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="חפש פרומפט..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-brand-dark-card border border-brand-dark-border rounded-xl py-2.5 pr-10 ps-4 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-brand-purple/50 transition-colors"
          />
        </div>
        <p className="text-sm text-gray-500 shrink-0">
          <span className="text-brand-purple font-semibold">{freeCount}</span> חינם ·{' '}
          <span className="text-gray-400">{PROMPTS.length - freeCount}</span> Pro
        </p>
      </div>

      {/* Category tabs */}
      {!query && (
        <div className="flex flex-wrap gap-2 mb-8">
          <CategoryTab
            value="all"
            label="הכל"
            emoji="⚡"
            count={PROMPTS.length}
            active={category === 'all'}
            onClick={() => setCategory('all')}
          />
          {(Object.entries(CATEGORIES) as [Category, (typeof CATEGORIES)[Category]][]).map(([key, val]) => (
            <CategoryTab
              key={key}
              value={key}
              label={val.label}
              emoji={val.emoji}
              count={PROMPTS.filter((p) => p.category === key).length}
              active={category === key}
              onClick={() => setCategory(key)}
            />
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {results.length} פרומפטים {query ? `עבור "${query}"` : ''}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((p) => (
          <PromptCard key={p.id} prompt={p} onSelect={setSelected} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">🔍</p>
          <p>לא נמצאו פרומפטים עבור &quot;{query}&quot;</p>
        </div>
      )}

      <PromptModal prompt={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function CategoryTab({ value, label, emoji, count, active, onClick }: {
  value: string; label: string; emoji: string; count: number; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
        active
          ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
          : 'bg-brand-dark-card border border-brand-dark-border text-gray-400 hover:border-brand-purple/30 hover:text-gray-200'
      }`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
      <span className={`text-xs px-1.5 py-0.5 rounded-md ${active ? 'bg-white/20' : 'bg-brand-dark-border'}`}>
        {count}
      </span>
    </button>
  );
}
