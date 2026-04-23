import { TrendingUp, Wallet, BarChart3, Minus } from 'lucide-react';
import { formatCurrency, type CompoundResult } from '@/lib/compound';

interface Props {
  result: CompoundResult;
  showAfterTax: boolean;
  showRealValue: boolean;
}

export function ResultsSummary({ result, showAfterTax, showRealValue }: Props) {
  const displayValue = showAfterTax ? result.afterTaxValue : result.finalValue;
  const gainsPercent = ((result.totalGains / result.totalDeposited) * 100).toFixed(0);
  const multiplier = (result.finalValue / result.totalDeposited).toFixed(1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-brand-blue to-[#1a3a60] rounded-2xl p-5 text-white">
        <div className="flex items-center gap-1.5 opacity-75 mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-medium">{showAfterTax ? 'שווי אחרי מס' : 'שווי סופי'}</span>
        </div>
        <p className="text-2xl font-bold leading-none">{formatCurrency(displayValue)}</p>
        <p className="text-xs opacity-60 mt-1">{multiplier}x על ההשקעה שלך</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-1.5 text-gray-400 mb-2">
          <Wallet className="w-3.5 h-3.5" />
          <span className="text-xs">הפקדתי</span>
        </div>
        <p className="text-lg font-bold text-gray-800">{formatCurrency(result.totalDeposited)}</p>
      </div>

      <div className="bg-brand-green-light rounded-2xl p-4">
        <div className="flex items-center gap-1.5 text-brand-green-dark mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">רווחי ריבית</span>
        </div>
        <p className="text-lg font-bold text-brand-green-dark">{formatCurrency(result.totalGains)}</p>
        <p className="text-xs text-brand-green-dark/60 mt-0.5">+{gainsPercent}% מעל הפקדות</p>
      </div>

      {showRealValue && (
        <div className="bg-purple-50 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 text-purple-600 mb-2">
            <Minus className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">ערך ריאלי</span>
          </div>
          <p className="text-lg font-bold text-purple-700">{formatCurrency(result.realValue)}</p>
          <p className="text-xs text-purple-400 mt-0.5">בכסף של היום</p>
        </div>
      )}
    </div>
  );
}
