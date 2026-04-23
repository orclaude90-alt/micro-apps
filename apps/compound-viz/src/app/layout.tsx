import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import './globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CompoundViz - מחשבון ריבית דריבית',
  description: 'חשב את כוח הריבית דריבית על ההשקעות שלך עם ויזואליזציה ברורה, השוואת מסלולים ומחשבון מס ישראלי.',
  keywords: ['ריבית דריבית', 'מחשבון השקעות', 'קרן השתלמות', 'קופת גמל', 'חיסכון'],
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
