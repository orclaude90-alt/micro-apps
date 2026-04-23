import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import './globals.css';

const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-heebo', display: 'swap' });

export const metadata: Metadata = {
  title: 'ShipuzCalc - מחשבון עלות שיפוץ לישראלים',
  description: 'חשב עלות שיפוץ דירה בישראל לפי חדרים, סוגי עבודה, רמת גימור ואזור גיאוגרפי. כולל טיפים חיסכון וצ\'קליסט.',
  keywords: ['מחשבון שיפוץ', 'עלות שיפוץ דירה', 'שיפוץ ישראל', 'מחיר שיפוץ'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans bg-slate-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
