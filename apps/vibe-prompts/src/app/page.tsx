import { Zap, Star } from 'lucide-react';
import { Library } from '@/components/Library';
import { PROMPTS } from '@/lib/prompts';

export default function Home() {
  const freeCount = PROMPTS.filter((p) => !p.isPro).length;

  return (
    <main className="min-h-screen bg-brand-dark">
      {/* Hero */}
      <header className="border-b border-brand-dark-border bg-gradient-to-b from-brand-dark-card to-brand-dark">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/20 rounded-full px-4 py-1.5 text-sm text-brand-purple mb-5">
            <Zap className="w-3.5 h-3.5" />
            {PROMPTS.length} פרומפטים מוכנים לשימוש
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            בנה אפליקציות עם<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">
              AI — בלי להתחיל מאפס
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
            ספריית פרומפטים מוכנים לשימוש עבור Claude Code, Cursor, v0 ו-bolt.new.
            העתק, הדבק, קבל אפליקציה.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> {freeCount} פרומפטים חינם</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-purple">✓</span> Next.js + Tailwind + TypeScript</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-cyan">✓</span> עובד עם כל AI IDE</span>
          </div>
        </div>

        {/* Pro CTA */}
        <div className="max-w-5xl mx-auto px-4 pb-6">
          <div className="bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 border border-brand-purple/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-brand-purple" />
              <div>
                <p className="font-semibold text-white text-sm">Pro — {PROMPTS.length} פרומפטים + Prompt Builder AI</p>
                <p className="text-xs text-gray-400">תשלום חד-פעמי, עדכונים לנצח</p>
              </div>
            </div>
            <button className="shrink-0 px-5 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-semibold hover:bg-purple-600 transition-colors shadow-lg shadow-brand-purple/20">
              $19 — קנה עכשיו
            </button>
          </div>
        </div>
      </header>

      {/* Library */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <Library />
      </section>

      <footer className="text-center py-8 text-xs text-gray-600 border-t border-brand-dark-border mt-8">
        VibePrompts © {new Date().getFullYear()} · בנה חכם, בנה מהר
      </footer>
    </main>
  );
}
