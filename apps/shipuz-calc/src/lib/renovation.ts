export type WorkType = 'paint' | 'flooring' | 'kitchen' | 'bathroom' | 'electrical' | 'plumbing' | 'ac' | 'windows';
export type FinishLevel = 'basic' | 'standard' | 'luxury';
export type Region = 'gush_dan' | 'sharon' | 'north' | 'south' | 'jerusalem' | 'other';

export interface RenovationInput {
  sqm: number;
  rooms: number;
  works: WorkType[];
  finishLevel: FinishLevel;
  region: Region;
  occupied: boolean; // living there during renovation
}

export interface WorkEstimate {
  type: WorkType;
  label: string;
  low: number;
  mid: number;
  high: number;
  unit: string;
  weeks: number;
}

export interface RenovationResult {
  works: WorkEstimate[];
  totalLow: number;
  totalMid: number;
  totalHigh: number;
  weeksTotal: number;
  surpriseFactor: number; // % to add for hidden surprises
  regionalMultiplier: number;
}

// Base prices in ₪ per sqm or per unit (2025 market data)
const BASE_PRICES: Record<WorkType, { label: string; unit: string; base: { low: number; mid: number; high: number }; weeksPerRoom: number }> = {
  paint: {
    label: 'צביעה',
    unit: 'לכל הדירה',
    base: { low: 120, mid: 200, high: 380 }, // per sqm (walls + ceiling)
    weeksPerRoom: 0.5,
  },
  flooring: {
    label: 'ריצוף / פרקט',
    unit: 'למ"ר',
    base: { low: 200, mid: 380, high: 700 }, // per sqm incl. material + labor
    weeksPerRoom: 0.7,
  },
  kitchen: {
    label: 'מטבח',
    unit: 'לכלל המטבח',
    base: { low: 25000, mid: 50000, high: 120000 }, // flat
    weeksPerRoom: 3,
  },
  bathroom: {
    label: 'חדר אמבטיה',
    unit: 'לחדר',
    base: { low: 15000, mid: 30000, high: 65000 }, // per bathroom
    weeksPerRoom: 2.5,
  },
  electrical: {
    label: 'חשמל (עמידה בתקן)',
    unit: 'לכל הדירה',
    base: { low: 8000, mid: 15000, high: 30000 }, // flat by size
    weeksPerRoom: 1,
  },
  plumbing: {
    label: 'אינסטלציה',
    unit: 'לכל הדירה',
    base: { low: 5000, mid: 12000, high: 25000 },
    weeksPerRoom: 1,
  },
  ac: {
    label: 'מיזוג אוויר',
    unit: 'ליחידה',
    base: { low: 2500, mid: 4500, high: 8000 }, // per unit
    weeksPerRoom: 0.3,
  },
  windows: {
    label: 'חלונות ודלתות',
    unit: 'ליחידה',
    base: { low: 2000, mid: 4000, high: 9000 }, // per window
    weeksPerRoom: 0.5,
  },
};

const FINISH_MULTIPLIERS: Record<FinishLevel, number> = {
  basic: 0.75,
  standard: 1.0,
  luxury: 1.8,
};

const REGION_MULTIPLIERS: Record<Region, number> = {
  gush_dan: 1.2,
  jerusalem: 1.15,
  sharon: 1.05,
  north: 0.9,
  south: 0.85,
  other: 0.95,
};

const OCCUPIED_SURCHARGE = 0.15; // 15% more if living there

export function calculateRenovation(input: RenovationInput): RenovationResult {
  const { sqm, rooms, works, finishLevel, region, occupied } = input;
  const fm = FINISH_MULTIPLIERS[finishLevel];
  const rm = REGION_MULTIPLIERS[region];
  const om = occupied ? 1 + OCCUPIED_SURCHARGE : 1;

  const workEstimates: WorkEstimate[] = works.map((type) => {
    const config = BASE_PRICES[type];
    let low: number, mid: number, high: number, weeks: number;

    switch (type) {
      case 'paint':
        low = config.base.low * sqm * fm * rm * om;
        mid = config.base.mid * sqm * fm * rm * om;
        high = config.base.high * sqm * fm * rm * om;
        weeks = config.weeksPerRoom * rooms;
        break;
      case 'flooring':
        low = config.base.low * sqm * fm * rm * om;
        mid = config.base.mid * sqm * fm * rm * om;
        high = config.base.high * sqm * fm * rm * om;
        weeks = config.weeksPerRoom * rooms;
        break;
      case 'kitchen':
        low = config.base.low * fm * rm * om;
        mid = config.base.mid * fm * rm * om;
        high = config.base.high * fm * rm * om;
        weeks = config.weeksPerRoom;
        break;
      case 'bathroom': {
        const bathrooms = Math.max(1, Math.floor(rooms / 3));
        low = config.base.low * bathrooms * fm * rm * om;
        mid = config.base.mid * bathrooms * fm * rm * om;
        high = config.base.high * bathrooms * fm * rm * om;
        weeks = config.weeksPerRoom * bathrooms;
        break;
      }
      case 'electrical':
        low = (config.base.low + sqm * 30) * fm * rm * om;
        mid = (config.base.mid + sqm * 50) * fm * rm * om;
        high = (config.base.high + sqm * 100) * fm * rm * om;
        weeks = config.weeksPerRoom;
        break;
      case 'plumbing':
        low = config.base.low * fm * rm * om;
        mid = config.base.mid * fm * rm * om;
        high = config.base.high * fm * rm * om;
        weeks = config.weeksPerRoom;
        break;
      case 'ac': {
        const units = Math.max(1, rooms - 1);
        low = config.base.low * units * fm * rm;
        mid = config.base.mid * units * fm * rm;
        high = config.base.high * units * fm * rm;
        weeks = config.weeksPerRoom * units;
        break;
      }
      case 'windows': {
        const winCount = rooms * 2;
        low = config.base.low * winCount * fm * rm;
        mid = config.base.mid * winCount * fm * rm;
        high = config.base.high * winCount * fm * rm;
        weeks = config.weeksPerRoom * winCount;
        break;
      }
    }

    return {
      type,
      label: config.label,
      low: Math.round(low / 100) * 100,
      mid: Math.round(mid / 100) * 100,
      high: Math.round(high / 100) * 100,
      unit: config.unit,
      weeks: Math.round(weeks * 10) / 10,
    };
  });

  const totalLow = workEstimates.reduce((s, w) => s + w.low, 0);
  const totalMid = workEstimates.reduce((s, w) => s + w.mid, 0);
  const totalHigh = workEstimates.reduce((s, w) => s + w.high, 0);
  // parallel weeks (not sequential) - works overlap
  const weeksTotal = Math.round(workEstimates.reduce((s, w) => s + w.weeks, 0) * 0.7);

  return {
    works: workEstimates,
    totalLow,
    totalMid,
    totalHigh,
    weeksTotal: Math.max(weeksTotal, 2),
    surpriseFactor: 20,
    regionalMultiplier: rm,
  };
}

export const WORK_OPTIONS: { type: WorkType; label: string; icon: string; description: string }[] = [
  { type: 'paint', label: 'צביעה', icon: '🎨', description: 'קירות, תקרות, פנים ופנאי' },
  { type: 'flooring', label: 'ריצוף / פרקט', icon: '🏠', description: 'הנחה, פירוק ישן, חומרים' },
  { type: 'kitchen', label: 'מטבח', icon: '🍳', description: 'ארונות, משטחים, ציוד' },
  { type: 'bathroom', label: 'חדר אמבטיה', icon: '🚿', description: 'אריחים, כלים סניטריים' },
  { type: 'electrical', label: 'חשמל', icon: '⚡', description: 'לוח, נקודות, עמידה בתקן' },
  { type: 'plumbing', label: 'אינסטלציה', icon: '🔧', description: 'צנרת, ברזים, מונה מים' },
  { type: 'ac', label: 'מיזוג אוויר', icon: '❄️', description: 'יחידות מיני-מרכזי' },
  { type: 'windows', label: 'חלונות ודלתות', icon: '🪟', description: 'החלפה, אלומיניום' },
];

export const REGION_OPTIONS: { value: Region; label: string }[] = [
  { value: 'gush_dan', label: 'גוש דן / תל אביב' },
  { value: 'jerusalem', label: 'ירושלים' },
  { value: 'sharon', label: 'השרון / מרכז' },
  { value: 'north', label: 'צפון' },
  { value: 'south', label: 'דרום / נגב' },
  { value: 'other', label: 'אחר' },
];

export const FINISH_OPTIONS: { value: FinishLevel; label: string; description: string }[] = [
  { value: 'basic', label: 'בסיסי', description: 'חומרים מוזלים, ביצוע סביר' },
  { value: 'standard', label: 'סטנדרט', description: 'חומרים טובים, ביצוע מקצועי' },
  { value: 'luxury', label: 'יוקרה', description: 'חומרי פרימיום, ביצוע מושלם' },
];

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(n);
}
