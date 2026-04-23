import { NextRequest, NextResponse } from 'next/server';
import { createClaudeClient, callClaudeJSON } from '@micro-apps/claude';
import { z } from 'zod';
import type { RenovationInput } from '@/lib/renovation';

const schema = z.object({
  tips: z.array(z.string()).max(6),
  checklist: z.array(z.string()).max(10),
});

const SYSTEM = `אתה יועץ שיפוצים מנוסה לשוק הישראלי. תן עצות פרקטיות וקונקרטיות בעברית. אל תהיה כללי.`;

export async function POST(req: NextRequest) {
  const input: RenovationInput = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // fallback static tips when no key configured
    return NextResponse.json({
      tips: [
        'קבל לפחות 3 הצעות מחיר מקבלנים שונים לפני שאתה מתחייב',
        'קנה חומרים בעצמך (ריצוף, ברזים) — תחסוך 15%-25% על המחיר',
        'שיפוץ בחודשי ינואר-פברואר זול יותר ב-10%-15% (עונת שפל)',
        'בקש פירוט מלא בחוזה — כל שינוי קטן עולה הרבה ב"תוספות"',
        'בדוק שהקבלן מבוטח ורשום ברשם הקבלנים',
        'אל תשלם יותר מ-30% מקדמה — שלם לפי התקדמות עבודה',
      ],
      checklist: [
        'קבל 3 הצעות מחיר בכתב',
        'בדוק רשיון קבלן ובטוח',
        'חתום על חוזה מפורט עם לוח זמנים',
        'הכן תוכנית ובקש היתר בנייה אם נדרש',
        'סדר אחסון לרהיטים ורכוש',
        'הודע לשכנים מראש',
        'פתח חשבון נפרד לתקציב השיפוץ',
        'צלם תמונות לפני תחילת העבודה',
      ],
    });
  }

  const client = createClaudeClient(apiKey);
  const worksHebrew = input.works.join(', ');

  const result = await callClaudeJSON(client, {
    schema,
    system: SYSTEM,
    prompt: `שיפוץ דירה של ${input.sqm} מ"ר, ${input.rooms} חדרים, אזור: ${input.region}, רמת גימור: ${input.finishLevel}.
עבודות מתוכננות: ${worksHebrew}. ${input.occupied ? 'מתגוררים בדירה במהלך השיפוץ.' : ''}

תן:
1. "tips": מערך של 5-6 טיפים ספציפיים לחיסכון כסף בשיפוץ הזה (לא כלליים — ספציפיים לעבודות שנבחרו)
2. "checklist": מערך של 8-10 פעולות לפני תחילת השיפוץ

החזר JSON בלבד.`,
    maxTokens: 1024,
    temperature: 0.5,
  });

  return NextResponse.json(result);
}
