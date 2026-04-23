'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency, type YearData } from '@/lib/compound';

interface Props {
  data: YearData[];
  showAfterTax: boolean;
  showRealValue: boolean;
}

export function GrowthChart({ data, showAfterTax, showRealValue }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-semibold text-gray-800 mb-4">צמיחת ההשקעה לאורך זמן</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D084" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#00D084" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDeposited" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A2540" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0A2540" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9333ea" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'שנים', position: 'insideLeft', offset: -5, fontSize: 11, fill: '#9ca3af' }}
          />
          <YAxis
            tickFormatter={(v: number) => `₪${(v / 1000).toFixed(0)}K`}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            width={65}
          />
          <Tooltip
            formatter={(value: number, name: string) => [formatCurrency(value), name]}
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              fontSize: '13px',
              direction: 'rtl',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
          />
          <Area
            type="monotone"
            dataKey="totalDeposited"
            name="סה״כ הפקדות"
            stroke="#0A2540"
            fill="url(#colorDeposited)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey={showAfterTax ? 'afterTaxValue' : 'totalValue'}
            name={showAfterTax ? 'שווי (אחרי מס)' : 'שווי כולל'}
            stroke="#00D084"
            fill="url(#colorValue)"
            strokeWidth={2.5}
          />
          {showRealValue && (
            <Area
              type="monotone"
              dataKey="realValue"
              name="ערך ריאלי"
              stroke="#9333ea"
              fill="url(#colorReal)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
