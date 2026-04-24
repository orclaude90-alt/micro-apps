import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import './globals.css';

const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-heebo', display: 'swap' });

export const metadata: Metadata = {
  title: 'מחשבון עלות שיפוץ 2025 — כמה יעלה לך לשפץ דירה בישראל?',
  description: 'מחשבון שיפוץ דירה חינמי בעברית. קבל הערכת מחיר לפי גוש דן, ירושלים, צפון ודרום — צבע, ריצוף, מטבח, שירותים, חשמל ועוד. כולל טיפים לחיסכון.',
  keywords: ['מחשבון שיפוץ', 'עלות שיפוץ דירה', 'מחיר שיפוץ ישראל', 'שיפוץ דירה 2025', 'כמה עולה לשפץ דירה'],
  openGraph: {
    title: 'מחשבון עלות שיפוץ 2025 — כמה יעלה לך לשפץ דירה?',
    description: 'קבל הערכת מחיר מהירה לשיפוץ דירה לפי אזור, רמת גימור וסוגי עבודה. חינם, בעברית.',
    locale: 'he_IL',
    type: 'website',
  },
  alternates: { canonical: 'https://shipuz-calc.vercel.app' },
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
