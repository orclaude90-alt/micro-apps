import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import './globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'מחשבון ריבית דריבית 2025 — כמה יגדל הכסף שלך?',
  description: 'מחשבון ריבית דריבית חינמי בעברית. חשב כמה ישווה החיסכון שלך בעוד 10, 20 או 30 שנה — קרן השתלמות, קופת גמל, S&P 500. כולל גרף, טבלה ומחשבון מס.',
  keywords: ['ריבית דריבית', 'מחשבון ריבית דריבית', 'מחשבון השקעות', 'קרן השתלמות', 'קופת גמל', 'חיסכון לטווח ארוך', 'S&P 500 ישראל'],
  openGraph: {
    title: 'מחשבון ריבית דריבית 2025 — כמה יגדל הכסף שלך?',
    description: 'חשב בחינם כמה ישווה החיסכון שלך — קרן השתלמות, קופת גמל, S&P 500. גרף ברור + השוואת מסלולים.',
    locale: 'he_IL',
    type: 'website',
  },
  alternates: { canonical: 'https://micro-apps-compound-viz.vercel.app' },
  icons: { icon: '/icon.png', apple: '/icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans bg-gray-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
