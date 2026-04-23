'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Settings2, BarChart3, Table2, GitCompare, Share2, Check } from 'lucide-react';
import { calculateCompound, PRESETS, type CompoundParams } from '@/lib/compound';
import { InputField } from './InputField';
import { ResultsSummary } from './ResultsSummary';
import { YearTable } from './YearTable';

// Recharts has SSR issues — load only on client
const GrowthChart = dynamic(() => import('./GrowthChart').then((m) => m.GrowthChart), {
  ssr: false,
  loading: () => <div className="bg-white rounded-2xl border border-gray-100 h-[320px] animate-pulse" />,
});
const BreakdownChart = dynamic(() => import('./BreakdownChart').then((m) => m.BreakdownChart), {
  ssr: false,
  loading: () => <div className="bg-white rounded-2xl border border-gray-100 h-[260px] animate-pulse" />,
});
const ComparisonMode = dynamic(() => import('./ComparisonMode').then((m) => m.ComparisonMode), {
  ssr: false,
  loading: () => <div className="bg-white rounded-2xl border border-gray-100 h-[360px] animate-pulse" />,
});

const DEFAULTS: CompoundParams = {
  initialAmount: 50000,
  monthlyDeposit: 2000,
  annualRate: 7,
  years: 20,
  taxRate: 25,
  inflationRate: 3,
};

type Tab = 'chart' | 'table' | 'compare';

export function Calculator() {
  const [params, setParams] = useState<CompoundParams>(DEFAULTS);
  const [showAfterTax, setShowAfterTax] = useState(false);
  const [showRealValue, setShowRealValue] = useState(false);
  const [tab, setTab] = useState<Tab>('chart');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => calculateCompound(params), [params]);

  const set = useCallback(
    (key: keyof CompoundParams) => (value: number) =>
      setParams((p) => ({ ...p, [key]: value })),
    [],
  );

  const applyPreset = (idx: number) => {
    const preset = PRESETS[idx];
    setParams((p) => ({ ...p, annualRate: preset.rate, taxRate: preset.taxRate }));
  };

  const shareUrl = () => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'chart',   label: 'גרף',    icon: <BarChart3  className="w-4 h-4" /> },
    { id: 'table',   label: 'טבלה',   icon: <Table2     className="w-4 h-4" /> },
    { id: 'compare', label: 'השוואה', icon: <GitCompare className="w-4 h-4" /> },
  ];

  return (
    <section id="calculator" className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      {/* Presets */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          מסלולי השקעה נפוצים — לחץ להחלת הפרמטרים:
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(idx)}
              title={preset.description}
              className="px-3.5 py-1.5 text-xs rounded-full border border-gray-200 bg-white hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all font-medium text-gray-600 shadow-sm"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Inputs */}
        <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 h-fit lg:sticky lg:top-4">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-gray-400" />
            <h2 className="font-semibold text-gray-800 text-sm">הגדרות</h2>
          </div>

          <InputField label="סכום התחלתי" value={params.initialAmount} min={0}  max={5000000} step={5000} suffix="₪"     onChange={set('initialAmount')} />
          <InputField label="הפקדה חודשית"  value={params.monthlyDeposit}  min={0}  max={50000}   step={500}  suffix="₪"     onChange={set('monthlyDeposit')} />
          <InputField label="תשואה שנתית"   value={params.annualRate}       min={0}  max={30}      step={0.5}  suffix="%"     decimals={1} onChange={set('annualRate')} />
          <InputField label="שנות חיסכון"   value={params.years}            min={1}  max={50}      step={1}    suffix="שנים" onChange={set('years')} />

          <div className="border-t border-gray-100 pt-4 space-y-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">מתקדם</p>
            <InputField label="מס רווח הון"    value={params.taxRate}       min={0} max={50} step={1}   suffix="%" onChange={set('taxRate')} />
            <InputField label="אינפלציה שנתית" value={params.inflationRate} min={0} max={15} step={0.5} suffix="%" decimals={1} onChange={set('inflationRate')} />
          </div>

          {/* Toggles — div instead of label to avoid click conflicts */}
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <Toggle label="הצג אחרי מס"             checked={showAfterTax}  onChange={setShowAfterTax}  color="#f59e0b" />
            <Toggle label="ערך ריאלי (נטרול אינפלציה)" checked={showRealValue} onChange={setShowRealValue} color="#9333ea" />
          </div>

          <button
            type="button"
            onClick={shareUrl}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'הקישור הועתק!' : 'שתף תרחיש זה'}
          </button>
        </aside>

        {/* Results */}
        <div className="space-y-5">
          <ResultsSummary result={result} showAfterTax={showAfterTax} showRealValue={showRealValue} />

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id
                    ? 'bg-white text-[#0A2540] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'chart' && (
            <div className="space-y-5">
              <GrowthChart data={result.yearlyData} showAfterTax={showAfterTax} showRealValue={showRealValue} />
              <BreakdownChart result={result} />
            </div>
          )}
          {tab === 'table' && (
            <YearTable data={result.yearlyData} showAfterTax={showAfterTax} />
          )}
          {tab === 'compare' && (
            <ComparisonMode baseParams={params} />
          )}
        </div>
      </div>
    </section>
  );
}

function Toggle({
  label, checked, onChange, color,
}: {
  label: string; checked: boolean; onChange: (v: boolean) => void; color: string;
}) {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onChange(!checked)}>
      <div
        role="switch"
        aria-checked={checked}
        style={{ backgroundColor: checked ? color : '#e5e7eb' }}
        className="relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors"
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-[18px]' : 'translate-x-0.5'
          }`}
        />
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
