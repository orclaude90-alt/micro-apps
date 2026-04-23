'use client';

import { formatNumber } from '@/lib/compound';

interface InputFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  decimals?: number;
  onChange: (value: number) => void;
}

export function InputField({ label, value, min, max, step, suffix = '', decimals = 0, onChange }: InputFieldProps) {
  const display = decimals > 0 ? value.toFixed(decimals) : formatNumber(value);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm text-gray-600">{label}</label>
        <span className="text-sm font-bold text-brand-blue tabular-nums">
          {display}{suffix ? ` ${suffix}` : ''}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-brand-green"
        style={{ accentColor: '#00D084' }}
      />
      <div className="flex justify-between text-xs text-gray-300">
        <span>{decimals > 0 ? `${min.toFixed(decimals)}${suffix}` : `${formatNumber(min)}${suffix}`}</span>
        <span>{decimals > 0 ? `${max.toFixed(decimals)}${suffix}` : `${formatNumber(max)}${suffix}`}</span>
      </div>
    </div>
  );
}
