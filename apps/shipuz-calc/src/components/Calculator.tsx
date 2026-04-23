'use client';

import { useState } from 'react';
import { RenovationForm } from './RenovationForm';
import { ResultsView } from './ResultsView';
import { calculateRenovation, type RenovationInput } from '@/lib/renovation';

export function Calculator() {
  const [result, setResult] = useState<Awaited<ReturnType<typeof calculateRenovation>> | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [checklist, setChecklist] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<RenovationInput | null>(null);

  const handleSubmit = async (data: RenovationInput) => {
    setLoading(true);
    setInput(data);

    const calc = calculateRenovation(data);
    setResult(calc);

    // Fetch AI tips in background
    try {
      const res = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setTips(json.tips ?? []);
      setChecklist(json.checklist ?? []);
    } catch {
      setTips([]);
      setChecklist([]);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setTips([]);
    setChecklist([]);
    setInput(null);
  };

  if (result && input) {
    return <ResultsView result={result} tips={tips} checklist={checklist} input={input} onReset={handleReset} />;
  }

  return <RenovationForm onSubmit={handleSubmit} loading={loading} />;
}
