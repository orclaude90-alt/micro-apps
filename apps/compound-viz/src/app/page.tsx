import { Calculator } from '@/components/Calculator';
import { Hero } from '@/components/Hero';
import { FAQ } from '@/components/FAQ';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <Calculator />
      <FAQ />
      <footer className="text-center py-8 text-sm text-gray-400 border-t border-gray-100 bg-white mt-12">
        <p>CompoundViz © {new Date().getFullYear()} · כל הזכויות שמורות</p>
        <p className="mt-1 text-xs">המחשבון מיועד למטרות מידע בלבד ואינו ייעוץ השקעות</p>
      </footer>
    </main>
  );
}
