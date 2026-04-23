import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'VibePrompts - 50 פרומפטים לבניית אפליקציות',
  description: 'ספריית פרומפטים מוכנים לשימוש לבניית אפליקציות עם Claude Code, Cursor, v0 ו-bolt.new. העתק, הדבק, קבל אפליקציה.',
  keywords: ['vibe coding', 'claude code', 'cursor', 'prompts', 'ai', 'app building'],
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
