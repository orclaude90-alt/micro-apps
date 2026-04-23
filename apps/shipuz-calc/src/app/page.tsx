import { Calculator } from '@/components/Calculator';
import { Hammer } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <header className="bg-brand-blue text-white py-10 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-1">
            <Hammer className="w-4 h-4 text-brand-orange" />
            מחשבון שיפוץ חכם לישראלים
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            כמה יעלה לשפץ את הדירה שלך?
          </h1>
          <p className="text-white/70">
            הערכת עלות מדויקת לפי שוק הישראלי, כולל טיפים לחיסכון וצ&#39;קליסט מקצועי
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-1 text-sm text-white/60">
            <span>✓ מחירי שוק 2025</span>
            <span>✓ לפי אזור גיאוגרפי</span>
            <span>✓ טיפים AI</span>
            <span>✓ צ&#39;קליסט חינם</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Calculator />
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100 mt-8">
        <p>ShipuzCalc © {new Date().getFullYear()} · ההערכות מבוססות על מחירי שוק ממוצעים ואינן מהוות הצעת מחיר</p>
      </footer>
    </main>
  );
}
