'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'מה זה ריבית דריבית?',
    a: 'ריבית דריבית (Compound Interest) היא ריבית שמחושבת גם על הקרן המקורית וגם על הריבית שנצברה בתקופות הקודמות. אלברט איינשטיין כינה אותה "הפלא השמיני של העולם" — ככל שהזמן ארוך יותר, ההשפעה דרמטית יותר.',
  },
  {
    q: 'מה ההבדל בין קרן השתלמות לקופ"ג להשקעה?',
    a: 'קרן השתלמות פטורה לגמרי ממס על הרווחים עד התקרה (כ-19,080 ₪ הפקדה שנתית לשכיר). לאחר 6 שנים הכסף נזיל. קופ"ג להשקעה ממוסה ב-15% מס מועדף על הרווחים הריאליים (במקום 25% רגיל) ונזילה מיד.',
  },
  {
    q: 'למה חשוב לנטרל אינפלציה?',
    a: 'אם החיסכון שלך צמח ב-100% אבל האינפלציה הייתה 80%, כוח הקנייה שלך עלה ב-20% בלבד. המחשבון מציג לך את הערך הריאלי — מה הכסף שווה בערכי ים אלה, לא ערכים עתידיים מנופחים.',
  },
  {
    q: 'מה תשואה ריאלית היסטורית של שוק המניות?',
    a: 'S&P 500 הניב ~10% שנתי נומינלי (לפני מס ואינפלציה) לאורך מאה שנה. מנוטרל אינפלציה (~3%) ומס (25%) — הרוויח כ-5%-6% שנתי ריאלי. ת"א 125 הניב ~8% נומינלי בממוצע לאורך 20 שנה.',
  },
  {
    q: 'מה שיעור המס על רווחי הון בישראל?',
    a: '25% על רווחים נומינליים ברוב האפיקים. 15% על רווחים ריאליים בקופ"ג להשקעה ובפוליסות חיסכון. קרן השתלמות — פטורה לחלוטין עד התקרה. הרווחים בחשבון IRA בארה"ב ממוסים בסוף על פי מס הכנסה.',
  },
  {
    q: 'האם המחשבון מדויק ב-100%?',
    a: 'המחשבון מבוסס על חישוב ריבית חודשית מצטברת עם הפקדות חודשיות קבועות — הנוסחה הסטנדרטית. אינו מתחשב בשינויי ריבית עתידיים, עלויות ניהול (דמי ניהול), או שינויי חוק מס. מיועד להמחשה ולתכנון ראשוני בלבד.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-brand-blue text-center mb-8">שאלות נפוצות</h2>
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{faq.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 flex-shrink-0 ms-3 transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                <p className="pt-4">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
