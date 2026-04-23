'use client';

import { useState } from 'react';
import { Home, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  WORK_OPTIONS, REGION_OPTIONS, FINISH_OPTIONS,
  type RenovationInput, type WorkType, type FinishLevel, type Region,
} from '@/lib/renovation';

interface Props { onSubmit: (input: RenovationInput) => void; loading: boolean; }

const STEPS = [
  { label: 'הדירה', icon: Home },
  { label: 'עבודות', icon: Sparkles },
  { label: 'פרטים', icon: MapPin },
];

export function RenovationForm({ onSubmit, loading }: Props) {
  const [step, setStep] = useState(0);
  const [sqm, setSqm] = useState(80);
  const [rooms, setRooms] = useState(3);
  const [works, setWorks] = useState<WorkType[]>(['paint', 'flooring']);
  const [finishLevel, setFinishLevel] = useState<FinishLevel>('standard');
  const [region, setRegion] = useState<Region>('gush_dan');
  const [occupied, setOccupied] = useState(false);

  const toggleWork = (w: WorkType) =>
    setWorks((prev) => prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w]);

  const canNext = step === 0 || (step === 1 && works.length > 0);

  const handleSubmit = () => {
    onSubmit({ sqm, rooms, works, finishLevel, region, occupied });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Step indicator */}
      <div className="flex border-b border-gray-100">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-medium transition-colors ${
                i === step ? 'text-brand-orange border-b-2 border-brand-orange bg-orange-50/50' :
                i < step ? 'text-emerald-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden text-xs">{i + 1}</span>
            </div>
          );
        })}
      </div>

      <div className="p-6">
        {/* Step 0: Apartment basics */}
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="font-semibold text-gray-800">מה גודל הדירה?</h2>
            <SliderField label="שטח הדירה" value={sqm} min={30} max={300} step={5} suffix="מ״ר" onChange={setSqm} />
            <SliderField label="מספר חדרים" value={rooms} min={1} max={8} step={1} suffix="חדרים" onChange={setRooms} />
          </div>
        )}

        {/* Step 1: Work types */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-800">אילו עבודות מתוכננות?</h2>
            <p className="text-sm text-gray-500">בחר את כל סוגי העבודות שרלוונטיות לשיפוץ שלך</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WORK_OPTIONS.map((w) => {
                const selected = works.includes(w.type);
                return (
                  <button
                    key={w.type}
                    onClick={() => toggleWork(w.type)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all ${
                      selected
                        ? 'border-brand-orange bg-brand-orange-light text-brand-orange'
                        : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{w.icon}</span>
                    <span className="text-xs font-medium leading-tight">{w.label}</span>
                  </button>
                );
              })}
            </div>
            {works.length === 0 && (
              <p className="text-xs text-red-400 text-center">יש לבחור לפחות עבודה אחת</p>
            )}
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-800">פרטים אחרונים</h2>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">רמת גימור</label>
              <div className="grid grid-cols-3 gap-2">
                {FINISH_OPTIONS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFinishLevel(f.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-center transition-all ${
                      finishLevel === f.value
                        ? 'border-brand-orange bg-brand-orange-light'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-800">{f.label}</span>
                    <span className="text-xs text-gray-400 leading-tight">{f.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">אזור גיאוגרפי</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {REGION_OPTIONS.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRegion(r.value)}
                    className={`py-2 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      region === r.value
                        ? 'border-brand-orange bg-brand-orange-light text-brand-orange'
                        : 'border-gray-100 text-gray-600 hover:border-gray-200'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={occupied}
                onChange={(e) => setOccupied(e.target.checked)}
                className="w-4 h-4 accent-brand-orange rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-800">אני מתגורר בדירה במהלך השיפוץ</span>
                <p className="text-xs text-gray-400">מוסיף ~15% לעלות (עבודה מסובכת יותר)</p>
              </div>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-0 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            הקודם
          </button>

          {step < 2 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-orange text-white rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-orange-600 transition-colors"
            >
              הבא
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  מחשב...
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  חשב עלות שיפוץ
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SliderField({ label, value, min, max, step, suffix, onChange }: {
  label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm text-gray-600">{label}</label>
        <span className="text-lg font-bold text-brand-blue">{value} <span className="text-sm font-normal text-gray-400">{suffix}</span></span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200"
        style={{ accentColor: '#F97316' }}
      />
      <div className="flex justify-between text-xs text-gray-300">
        <span>{min} {suffix}</span><span>{max} {suffix}</span>
      </div>
    </div>
  );
}
