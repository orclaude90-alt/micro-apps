'use client';

import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateCompound, formatCurrency, PRESETS, type CompoundParams } from '@/lib/compound';

interface Props {
  baseParams: CompoundParams;
}

const TRACK_COLORS = ['#00D084', '#0A2540', '#f59e0b', '#9333ea'];

export function ComparisonMode({ baseParams }: Props) {
  const tracks = useMemo(
    () =>
      PRESETS.map((preset) => ({
        ...preset,
        result: calculateCompound({
          ...baseParams,
          annualRate: preset.rate,
          taxRate: preset.taxRate,
        }),
      })),
    [baseParams],
  );

  // merge yearly data for chart
  const chartData = useMemo(() => {
    const maxYears = baseParams.years;
    return Array.from({ length: maxYears }, (_, i) => {
      const year = i + 1;
      const point: Record<string, number> = { year };
      tracks.forEach((t) => {
        const row = t.result.yearlyData.find((d) => d.year === year);
        if (row) point[t.label] = row.afterTaxValue;
      });
      return point;
    });
  }, [tracks, baseParams.years]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div>
        <h3 className="font-semibold text-gray-800">השוואת מסלולים (אחרי מס)</h3>
        <p className="text-xs text-gray-400 mt-0.5">הפקדות זהות, ריבית ומס שונים לפי מסלול</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
          <YAxis
            tickFormatter={(v: number) => `₪${(v / 1000).toFixed(0)}K`}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            width={65}
          />
          <Tooltip
            formatter={(value: number, name: string) => [formatCurrency(value), name]}
            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '13px', direction: 'rtl' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
          {tracks.map((t, i) => (
            <Area
              key={t.label}
              type="monotone"
              dataKey={t.label}
              stroke={TRACK_COLORS[i % TRACK_COLORS.length]}
              fill={TRACK_COLORS[i % TRACK_COLORS.length]}
              fillOpacity={0.06}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tracks.map((t, i) => (
          <div key={t.label} className="rounded-xl border border-gray-100 p-3 space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: TRACK_COLORS[i % TRACK_COLORS.length] }} />
              <span className="text-xs font-medium text-gray-700 truncate">{t.label}</span>
            </div>
            <p className="text-base font-bold text-brand-blue">{formatCurrency(t.result.afterTaxValue)}</p>
            <p className="text-xs text-gray-400">{t.rate}% · מס {t.taxRate}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
