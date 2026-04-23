import { TrendingUp, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-brand-blue text-white py-14 px-4 text-center">
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/80 mb-2">
          <TrendingUp className="w-4 h-4 text-brand-green" />
          מחשבון ריבית דריבית לישראלים
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          כמה שווה ה<span className="text-brand-green">כסף שלך</span> בעוד 20 שנה?
        </h1>
        <p className="text-lg text-white/70 leading-relaxed">
          מחשבון עם ויזואליזציה שמתחשב במס ישראלי, אינפלציה, קרן השתלמות וקופ"ג. בחינם.
        </p>
        <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm text-white/60">
          <span>✓ מס רווחי הון ישראלי</span>
          <span>✓ קרן השתלמות + קופ"ג</span>
          <span>✓ ערך ריאלי מנוטרל אינפלציה</span>
          <span>✓ השוואת מסלולים</span>
        </div>
        <a href="#calculator" className="inline-flex items-center gap-2 mt-4 text-brand-green text-sm font-medium hover:gap-3 transition-all">
          <span>התחל לחשב</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
