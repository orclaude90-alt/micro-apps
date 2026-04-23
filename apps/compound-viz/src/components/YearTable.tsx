'use client';

import { formatCurrency, type YearData } from '@/lib/compound';
import { useState } from 'react';

interface Props {
  data: YearData[];
  showAfterTax: boolean;
}

export function YearTable({ data, showAfterTax }: Props) {
  const [expanded, setExpanded] = useState(false);
  const rows = expanded ? data : data.filter((d) => d.year % 5 === 0 || d.year === 1 || d.year === data.length);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-50 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">נתונים שנה-שנה</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-brand-green-dark font-medium hover:underline"
        >
          {expanded ? 'הצג פחות' : 'הצג הכל'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs">
              <th className="text-right py-3 px-4 font-medium">שנה</th>
              <th className="text-right py-3 px-4 font-medium">הפקדות</th>
              <th className="text-right py-3 px-4 font-medium">רווחים</th>
              <th className="text-right py-3 px-4 font-medium">{showAfterTax ? 'שווי (אחרי מס)' : 'שווי כולל'}</th>
              <th className="text-right py-3 px-4 font-medium">×</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const multiplier = (row.totalValue / row.totalDeposited).toFixed(1);
              const isHighlight = row.year % 10 === 0 || row.year === data.length;
              return (
                <tr
                  key={row.year}
                  className={`border-t border-gray-50 transition-colors ${isHighlight ? 'bg-brand-green-light/50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <td className="py-3 px-4 font-medium text-gray-700">{row.year}</td>
                  <td className="py-3 px-4 text-gray-600">{formatCurrency(row.totalDeposited)}</td>
                  <td className="py-3 px-4 text-emerald-600 font-medium">{formatCurrency(row.gains)}</td>
                  <td className="py-3 px-4 font-semibold text-brand-blue">
                    {formatCurrency(showAfterTax ? row.afterTaxValue : row.totalValue)}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">{multiplier}x</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
