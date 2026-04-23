'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency, type CompoundResult } from '@/lib/compound';

interface Props {
  result: CompoundResult;
}

export function BreakdownChart({ result }: Props) {
  const data = [
    { name: 'הפקדות שלי', value: result.totalDeposited },
    { name: 'רווחי ריבית', value: result.totalGains },
  ];

  const COLORS = ['#0A2540', '#00D084'];

  const totalPct = ((result.totalGains / result.finalValue) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-semibold text-gray-800 mb-1">הרכב הסכום הסופי</h3>
      <p className="text-sm text-gray-500 mb-4">
        {totalPct}% מהסכום הסופי הוא רווחים מריבית דריבית
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [formatCurrency(value), name]}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '13px', direction: 'rtl' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-3 flex-1">
          {data.map((item, idx) => (
            <div key={item.name} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS[idx] }} />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="font-semibold text-sm text-gray-800">{formatCurrency(item.value)}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">סה"כ</span>
            <span className="font-bold text-brand-green-dark">{formatCurrency(result.finalValue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
