'use client';

import { AlertTriangle, Clock, CheckCircle2, RefreshCw } from 'lucide-react';
import { formatCurrency, type RenovationResult, type RenovationInput } from '@/lib/renovation';

interface Props {
  result: RenovationResult;
  tips: string[];
  checklist: string[];
  input: RenovationInput;
  onReset: () => void;
}

export function ResultsView({ result, tips, checklist, input, onReset }: Props) {
  const withSurprise = Math.round(result.totalMid * (1 + result.surpriseFactor / 100) / 1000) * 1000;

  return (
    <div className="space-y-5">
      {/* Main cost card */}
      <div className="bg-gradient-to-br from-brand-blue to-[#2a5298] rounded-2xl p-6 text-white shadow-lg">
        <p className="text-sm text-white/70 mb-1">הערכת עלות שיפוץ</p>
        <div className="flex items-end gap-3 mb-4">
          <div>
            <p className="text-4xl font-bold">{formatCurrency(result.totalMid)}</p>
            <p className="text-sm text-white/60 mt-0.5">הערכה ממוצעת (mid-range)</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-white/20 pt-4">
          <div>
            <p className="text-xs text-white/50">מינימום</p>
            <p className="text-base font-semibold">{formatCurrency(result.totalLow)}</p>
          </div>
          <div>
            <p className="text-xs text-white/50">ממוצע</p>
            <p className="text-base font-semibold text-brand-orange">{formatCurrency(result.totalMid)}</p>
          </div>
          <div>
            <p className="text-xs text-white/50">מקסימום</p>
            <p className="text-base font-semibold">{formatCurrency(result.totalHigh)}</p>
          </div>
        </div>
      </div>

      {/* Surprise budget warning */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">הוסף +20% לתקלות ומפתיעות</p>
          <p className="text-sm text-amber-700 mt-0.5">
            תקציב מומלץ לשיפוץ: <strong>{formatCurrency(withSurprise)}</strong>
          </p>
          <p className="text-xs text-amber-600 mt-1">שיפוץ כמעט תמיד מגלה הפתעות — צנרת ישנה, עובש נסתר, בעיות חשמל.</p>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4">
        <Clock className="w-5 h-5 text-blue-500" />
        <div>
          <p className="text-sm font-medium text-blue-800">
            משך עבודה משוער: <strong>{result.weeksTotal}–{result.weeksTotal + 2} שבועות</strong>
          </p>
          <p className="text-xs text-blue-600 mt-0.5">בהנחת ביצוע מקביל של חלק מהעבודות</p>
        </div>
      </div>

      {/* Work breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <h3 className="font-semibold text-gray-800 p-5 border-b border-gray-50">פירוט לפי עבודה</h3>
        <div className="divide-y divide-gray-50">
          {result.works.map((w) => {
            const pct = Math.round((w.mid / result.totalMid) * 100);
            return (
              <div key={w.type} className="px-5 py-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{w.label}</span>
                  <span className="text-sm font-bold text-gray-800">{formatCurrency(w.mid)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-orange rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-left">{pct}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {formatCurrency(w.low)} – {formatCurrency(w.high)} ({w.unit})
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Tips */}
      {tips.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-lg">💡</span> טיפים לחיסכון
          </h3>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-brand-orange font-bold mt-0.5">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Checklist */}
      {checklist.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            צ&#39;קליסט לפני שמתחילים
          </h3>
          <ul className="space-y-2">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-0.5 accent-emerald-500 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        חשב שיפוץ אחר
      </button>
    </div>
  );
}
