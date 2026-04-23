export interface CompoundParams {
  initialAmount: number;
  monthlyDeposit: number;
  annualRate: number; // %
  years: number;
  taxRate: number; // % (0 = no tax)
  inflationRate: number; // % (0 = nominal)
}

export interface YearData {
  year: number;
  totalDeposited: number;
  totalValue: number;
  gains: number;
  realValue: number; // inflation-adjusted
  afterTaxValue: number;
}

export interface CompoundResult {
  finalValue: number;
  afterTaxValue: number;
  realValue: number;
  totalDeposited: number;
  totalGains: number;
  yearlyData: YearData[];
}

export function calculateCompound(params: CompoundParams): CompoundResult {
  const { initialAmount, monthlyDeposit, annualRate, years, taxRate, inflationRate } = params;

  const monthlyRate = annualRate / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;

  let balance = initialAmount;
  let totalDeposited = initialAmount;
  const yearlyData: YearData[] = [];

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyDeposit;
      totalDeposited += monthlyDeposit;
    }

    const gains = balance - totalDeposited;
    const taxOnGains = gains * (taxRate / 100);
    const afterTaxValue = balance - taxOnGains;

    // inflation-adjusted: discount back to today's money
    const inflationFactor = Math.pow(1 + inflationRate / 100, year);
    const realValue = balance / inflationFactor;

    yearlyData.push({
      year,
      totalDeposited,
      totalValue: Math.round(balance),
      gains: Math.round(gains),
      realValue: Math.round(realValue),
      afterTaxValue: Math.round(afterTaxValue),
    });
  }

  const finalYear = yearlyData[yearlyData.length - 1];
  return {
    finalValue: finalYear.totalValue,
    afterTaxValue: finalYear.afterTaxValue,
    realValue: finalYear.realValue,
    totalDeposited: Math.round(finalYear.totalDeposited),
    totalGains: finalYear.gains,
    yearlyData,
  };
}

// Preset investment tracks common in Israel
export const PRESETS = [
  { label: 'S&P 500 היסטורי', rate: 10, taxRate: 25, description: 'תשואה ממוצעת של 10% (לפני מס)' },
  { label: 'קרן השתלמות', rate: 7, taxRate: 0, description: 'פטורה ממס עד התקרה, תשואה ממוצעת 7%' },
  { label: 'ת"א 125', rate: 8, taxRate: 25, description: 'מדד המניות הישראלי, ממוצע 8%' },
  { label: 'אג"ח ממשלתי', rate: 4, taxRate: 15, description: 'אפיק סולידי, ריבית 4%, מס 15%' },
  { label: 'קופ"ג להשקעה', rate: 6.5, taxRate: 15, description: 'מס מופחת 15% על רווחים ריאליים' },
] as const;

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('he-IL').format(n);
}
