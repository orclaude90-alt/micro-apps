import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'VibePrompts — פרומפטים מוכנים לבניית אפליקציות עם AI',
  description: 'ספריית 50+ פרומפטים מוכנים לשימוש לבניית אפליקציות עם Claude Code, Cursor, v0 ו-bolt.new. העתק, הדבק, קבל אפליקציה — בלי להתחיל מאפס.',
  keywords: ['vibe coding', 'claude code prompts', 'cursor prompts', 'ai app builder', 'פרומפטים לבניית אפליקציות', 'בניית אפליקציות עם AI'],
  openGraph: {
    title: 'VibePrompts — פרומפטים מוכנים לבניית אפליקציות עם AI',
    description: '50+ פרומפטים מוכנים לשימוש — Claude Code, Cursor, v0, bolt.new. העתק, הדבק, קבל אפליקציה.',
    locale: 'he_IL',
    type: 'website',
  },
  alternates: { canonical: 'https://vibe-prompts.vercel.app' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
