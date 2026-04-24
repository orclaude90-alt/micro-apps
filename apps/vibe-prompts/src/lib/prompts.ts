export type Category = 'starter' | 'tools' | 'business' | 'content' | 'mobile' | 'internal';
export type Stack = 'nextjs' | 'react' | 'vanilla';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  isPro: boolean;
  prompt: string;
  previewUrl?: string;
}

export const CATEGORIES: Record<Category, { label: string; emoji: string; description: string }> = {
  starter: { label: 'סטארטר', emoji: '🚀', description: 'דפי נחיתה, פורטפוליו, בלוג' },
  tools:   { label: 'כלים',   emoji: '🛠️', description: 'מחשבונים, ממירים, dashboards' },
  business:{ label: 'עסקי',  emoji: '💼', description: 'CRM, ניהול לקוחות, booking' },
  content: { label: 'תוכן',  emoji: '📝', description: 'AI chatbot, newsletter, knowledge base' },
  mobile:  { label: 'מובייל',emoji: '📱', description: 'PWA, apps מותאמים לנייד' },
  internal:{ label: 'פנימי', emoji: '⚙️', description: 'Admin panels, internal tools' },
};

export const PROMPTS: Prompt[] = [
  // ── STARTER ──────────────────────────────────────────────────────────
  {
    id: 'landing-saas',
    title: 'דף נחיתה SaaS מלא',
    description: 'דף נחיתה מקצועי עם hero, features, pricing, testimonials ו-CTA',
    category: 'starter',
    tags: ['landing', 'saas', 'marketing'],
    isPro: false,
    prompt: `בנה דף נחיתה SaaS מקצועי עם Next.js 15 + Tailwind CSS + shadcn/ui.

המבנה:
1. Navbar: לוגו שמאל, קישורי ניווט, כפתור "התחל בחינם" מימין
2. Hero: כותרת גדולה + תת-כותרת + שני כפתורי CTA (primary + outline) + screenshot mock של המוצר
3. Logos bar: "נבחר על ידי חברות מובילות" + 5 לוגו פלייסהולדר
4. Features: 6 פיצ'רים בגריד 3×2 עם אייקון Lucide, כותרת ותיאור
5. Pricing: 3 תוכניות (חינם / Pro / Enterprise) עם toggle חודשי/שנתי (-20%)
6. Testimonials: 3 ציטוטים עם avatar, שם, תפקיד
7. CTA section: רקע כהה, כותרת גדולה, כפתור
8. Footer: 4 עמודות קישורים

דרישות טכניות:
- TypeScript מלא, אין any
- Responsive mobile-first
- Dark mode תמיכה (class strategy)
- Framer Motion על ה-hero (fade-in)
- פונקציה togglePricing() לחלופה חודשי/שנתי
- כל הטקסטים placeholder בעברית`,
  },
  {
    id: 'portfolio-dev',
    title: 'פורטפוליו מפתח',
    description: 'אתר פורטפוליו אישי עם פרויקטים, כישורים וטופס יצירת קשר',
    category: 'starter',
    tags: ['portfolio', 'personal', 'developer'],
    isPro: true,
    prompt: `בנה אתר פורטפוליו מפתח עם Next.js 15 + Tailwind CSS.

סקשנים:
1. Hero: תמונה (placeholder), שם, תפקיד, סיסמה אישית, כפתורי GitHub/LinkedIn/Email
2. About: פסקה קצרה + רשימת כישורים עם progress bars אנימציה
3. Projects: כרטיסיות פרויקטים (6) עם תמונה, שם, תיאור, stack tags, קישורי GitHub/Live
4. Skills: grid של טכנולוגיות עם לוגו (SVG placeholders) ורמת שליטה
5. Timeline: ציר זמן ניסיון תעסוקתי
6. Contact: טופס (שם/אימייל/הודעה) שנשלח ל-Formspree

דרישות:
- אנימציות scroll-reveal עם Intersection Observer
- Smooth scroll בין סקשנים
- Dark mode toggle
- מובייל-פרסט מושלם`,
  },
  {
    id: 'landing-product',
    title: 'דף נחיתה מוצר פיזי',
    description: 'דף מכירה למוצר פיזי עם gallery, reviews ו-checkout פשוט',
    category: 'starter',
    tags: ['ecommerce', 'product', 'sales'],
    isPro: true,
    prompt: `בנה דף נחיתה למוצר פיזי עם React + Tailwind CSS.

כולל:
1. Sticky header עם שם מותג וכפתור "קנה עכשיו"
2. Hero עם image gallery (5 תמונות, thumbnail navigation, zoom on hover)
3. תיאור מוצר עם bullet points יתרונות, badge "משלוח חינם"
4. Variant selector (צבע / גודל) עם state management
5. Price + מחיר מחוק + badge הנחה
6. כפתור "הוסף לסל" עם אנימציית הצלחה
7. Reviews section: דירוג כוכבים ממוצע + 6 reviews עם תמונות
8. FAQ accordion
9. "לקוחות קנו גם" - 4 מוצרים קשורים

State management: useState בלבד, ללא Redux`,
  },
  {
    id: 'blog-nextjs',
    title: 'בלוג עם MDX',
    description: 'בלוג מלא עם MDX, קטגוריות, חיפוש ו-RSS feed',
    category: 'starter',
    tags: ['blog', 'mdx', 'content'],
    isPro: true,
    prompt: `בנה בלוג עם Next.js 15 App Router + MDX + Tailwind.

מבנה קבצים:
- /app/page.tsx: רשימת פוסטים עם חיפוש ו-filter קטגוריות
- /app/blog/[slug]/page.tsx: דף פוסט עם תוכן MDX
- /app/api/rss/route.ts: RSS feed
- /lib/posts.ts: פונקציות קריאת MDX (getAllPosts, getPostBySlug)
- /components/PostCard.tsx: כרטיסיית פוסט
- /components/MDXComponents.tsx: custom components למ-MDX

פיצ'רים:
- Reading time אוטומטי
- Table of contents צד שמאל (sticky)
- פוסטים קשורים בסוף
- כפתור copy לבלוקי קוד
- Open Graph image דינמי (OG)
- Pagination (6 פוסטים לעמוד)`,
  },
  // ── TOOLS ────────────────────────────────────────────────────────────
  {
    id: 'calculator-advanced',
    title: 'מחשבון מתקדם עם היסטוריה',
    description: 'מחשבון מדעי עם היסטוריית חישובים, מצבי תצוגה ו-keyboard support',
    category: 'tools',
    tags: ['calculator', 'math', 'utility'],
    isPro: true,
    prompt: `בנה מחשבון מדעי עם React + Tailwind CSS.

פיצ'רים:
- מצב בסיסי ומצב מדעי (toggle)
- כפתורים: ספרות, +−×÷, %, √, x², 1/x, sin/cos/tan, log, π, e
- תצוגה: שורה עיקרית (גדולה) + שורת expression (קטנה מעל)
- היסטוריה: 20 חישובים אחרונים בצד עם אפשרות לחזור לתוצאה
- Keyboard support מלא (מקלדת מספרית + Enter + Escape + Backspace)
- Error handling: "שגיאה" לחלוקה ב-0
- Copy תוצאה בלחיצה
- אנימציה על כפתורים (scale on press)
- Dark mode בלבד (מחשבון = dark)

State: useReducer לניהול מצב המחשבון`,
  },
  {
    id: 'unit-converter',
    title: 'ממיר יחידות אוניברסלי',
    description: 'ממיר יחידות ל-12 קטגוריות עם חיפוש מהיר',
    category: 'tools',
    tags: ['converter', 'units', 'utility'],
    isPro: true,
    prompt: `בנה ממיר יחידות עם React + Tailwind.

קטגוריות: אורך, משקל, טמפרטורה, נפח, שטח, מהירות, זמן, נתונים (MB/GB/TB), מטבע (שערים hardcoded), אנרגיה, לחץ, זווית.

UI:
- Select קטגוריה עם אייקון
- שני שדות input זה מול זה עם חץ swap באמצע
- Select יחידה מקור + יחידה יעד (שניהם searchable)
- תוצאה מתעדכנת real-time בהקלדה
- swap בלחיצה על חץ
- כפתור copy תוצאה
- היסטוריית המרות אחרונות (localStorage)

נוסחאות: כל ההמרות דרך יחידת בסיס (SI units)`,
  },
  {
    id: 'password-generator',
    title: 'מחולל סיסמאות חזק',
    description: 'מחולל סיסמאות עם מד חוזק, הגדרות וניהול סיסמאות',
    category: 'tools',
    tags: ['security', 'password', 'generator'],
    isPro: true,
    prompt: `בנה מחולל סיסמאות עם React + Tailwind.

UI:
1. סיסמה שנוצרה + כפתור copy + כפתור רענן (עם אנימציה)
2. Slider אורך (8-128 תווים)
3. Checkboxes: אותיות גדולות, קטנות, מספרים, סמלים (!@#$...)
4. Slider: מספר סיסמאות (1-10)
5. מד חוזק: Weak/Fair/Strong/Very Strong עם color bar
6. "לא כולל תווים מבלבלים" (0/O, 1/l/I)
7. רשימת הסיסמאות שנוצרו עם copy לכל אחת
8. Export כ-TXT

אלגוריתם חוזק: אורך, מגוון תווים, entropy bits
כל הפעולות ב-client בלבד (אין שרת, אין שמירת סיסמאות)`,
  },
  {
    id: 'color-palette',
    title: 'מחולל פלטת צבעים',
    description: 'מחולל פלטות צבע עם hue lock, export ל-CSS/Tailwind/Figma',
    category: 'tools',
    tags: ['design', 'color', 'css'],
    isPro: true,
    prompt: `בנה מחולל פלטת צבעים עם React + Tailwind.

פיצ'רים:
1. Color picker ראשי + 5 צבעים משלימים אוטומטיים (complementary, analogous, triadic)
2. מצבי הרמוניה: Complementary, Analogous, Triadic, Split-complementary, Monochromatic
3. Lock על צבע בודד (לא ישתנה ב-random)
4. כפתור "Generate Random" עם transition נחמד
5. כל צבע: HEX / RGB / HSL display, copy בלחיצה
6. Export:
   - CSS variables: --color-primary: #...
   - Tailwind config: colors: { primary: '#...' }
   - JSON
7. Contrast checker: האם צבע טקסט קריא על background (WCAG AA/AAA)
8. Tints & Shades: 9 גוונים של כל צבע (100-900)

כלים: tinycolor2 או חישוב HSL ידני`,
  },
  {
    id: 'qr-generator',
    title: 'מחולל QR קוד',
    description: 'מחולל QR עם עיצוב מותאם, לוגו באמצע ו-download',
    category: 'tools',
    tags: ['qr', 'generator', 'utility'],
    isPro: true,
    prompt: `בנה מחולל QR קוד עם React + Tailwind + qrcode.react.

פיצ'רים:
1. Input: URL / טקסט / WiFi / vCard / אימייל (tabs)
2. תצוגת QR בזמן אמת
3. עיצוב:
   - צבע foreground + background (color pickers)
   - גודל (128px - 512px slider)
   - Error correction: L/M/Q/H
   - סגנון נקודות: squares / rounded / dots
4. Upload לוגו לאמצע ה-QR
5. Download: PNG / SVG / Copy to clipboard
6. Share link: מקודד ב-URL params

Packages: qrcode.react, react-color`,
  },
  {
    id: 'markdown-editor',
    title: 'עורך Markdown חי',
    description: 'עורך Markdown עם תצוגה מפוצלת, themes ו-export',
    category: 'tools',
    tags: ['markdown', 'editor', 'writing'],
    isPro: true,
    prompt: `בנה עורך Markdown split-view עם React + Tailwind.

Layout: split-screen - editor שמאל, preview ימין (resizable divider)

פיצ'רים Editor:
- Syntax highlighting (CodeMirror 6 או Monaco)
- Toolbar: Bold/Italic/H1-H3/Link/Image/Code/Table/Quote
- כפתורי קיצור: Ctrl+B/I/K
- Line numbers
- Auto-pairs (סוגר אחרי פותח)
- Find & Replace (Ctrl+H)

פיצ'רים Preview:
- Render Markdown מלא (react-markdown + remark-gfm)
- Syntax highlighting בבלוקי קוד (rehype-highlight)
- כפתור Copy HTML
- Print-friendly CSS

כלי:
- מצב focus (מסתיר הכל חוץ מהטקסט)
- Word count / reading time
- Export: MD / HTML / PDF (window.print)
- localStorage autosave`,
  },
  {
    id: 'data-table',
    title: 'טבלת נתונים מתקדמת',
    description: 'טבלה עם sort, filter, pagination, export CSV ו-column visibility',
    category: 'tools',
    tags: ['table', 'data', 'csv'],
    isPro: true,
    prompt: `בנה טבלת נתונים מתקדמת עם React + Tailwind + TanStack Table v8.

פיצ'רים:
- Sort על כל עמודה (click header)
- Global search + filter לפי עמודה
- Pagination: 10/25/50/100 שורות, ניווט עמודים
- Column visibility: dropdown לבחירת עמודות גלויות
- Column resizing (drag)
- Row selection: checkbox, select all
- Actions על שורות: edit, delete, duplicate
- Export: CSV, JSON של הנתונים המסוננים
- Import CSV עם validation
- Sticky header

Data: 200 שורות sample data (users עם name/email/role/status/date)`,
  },
  // ── BUSINESS ─────────────────────────────────────────────────────────
  {
    id: 'crm-mini',
    title: 'CRM מיני',
    description: 'ניהול לקוחות עם pipeline, tasks ו-notes',
    category: 'business',
    tags: ['crm', 'clients', 'pipeline'],
    isPro: true,
    prompt: `בנה מיני CRM עם React + Tailwind + localStorage.

מסכים (React Router):
1. Dashboard: סטטיסטיקות (סה"כ לקוחות, deals פתוחות, הכנסות חזויות)
2. Contacts: טבלה של אנשי קשר עם search, filter לפי סטטוס, הוספה/עריכה/מחיקה
3. Pipeline: Kanban board עם drag-and-drop (dnd-kit) - שלבים: Lead / Qualified / Proposal / Won / Lost
4. Deal: דף deal עם notes, tasks, activity log
5. Tasks: רשימת tasks עם due date, priority, assigned contact

Data model:
- Contact: id, name, email, phone, company, status, tags
- Deal: id, title, value, stage, contactId, notes[], tasks[]

Storage: localStorage עם custom hook useLocalStorage`,
  },
  {
    id: 'booking-system',
    title: 'מערכת תיאום פגישות',
    description: 'קלנדר זמינות, בחירת שעה ואישור פגישה במייל',
    category: 'business',
    tags: ['booking', 'calendar', 'scheduling'],
    isPro: true,
    prompt: `בנה מערכת תיאום פגישות עם Next.js + Tailwind (כמו Calendly).

Flow:
1. עמוד ראשי: בחירת סוג פגישה (15/30/60 דקות)
2. קלנדר: חודש נוכחי,ימים זמינים מסומנים, בחירת יום
3. שעות: רשת שעות פנויות (interval 30 דק'), בחירת שעה
4. טופס: שם, אימייל, הערה, timezone detection אוטומטי
5. אישור: עמוד תודה עם פרטי הפגישה + כפתורי "הוסף לגוגל קלנדר"

Admin panel:
- /admin: הגדרת שעות עבודה (ימים + שעות)
- חסימת תאריכים ספציפיים
- רשימת הפגישות הקיימות
- Simple auth: סיסמה hardcoded

Storage: JSON file / localStorage (ללא DB)`,
  },
  {
    id: 'invoice-generator',
    title: 'מחולל חשבוניות',
    description: 'יצירת חשבוניות מקצועיות עם לוגו, פריטים ו-PDF download',
    category: 'business',
    tags: ['invoice', 'pdf', 'finance'],
    isPro: true,
    prompt: `בנה מחולל חשבוניות עם React + Tailwind + @react-pdf/renderer.

UI:
1. טופס שמאל:
   - פרטי עסק: שם, לוגו upload, כתובת, ח.פ., טלפון
   - פרטי לקוח: שם, כתובת, אימייל
   - מספר חשבונית + תאריך + תאריך תשלום
   - שורות: תיאור / כמות / מחיר יחידה / סה"כ (הוסף/מחק שורות)
   - הנחה (% או ₪) + מע"מ (17%) + סה"כ סופי
   - הערות + תנאי תשלום
2. Preview ימין: תצוגה חיה של החשבונית

Export: PDF בעיצוב מקצועי
Templates: 3 עיצובים לבחירה
שמירה: localStorage לטיוטות`,
  },
  {
    id: 'quote-builder',
    title: 'בונה הצעות מחיר',
    description: 'הצעות מחיר עם פריטים, תנאים ו-PDF מקצועי',
    category: 'business',
    tags: ['quote', 'pdf', 'sales'],
    isPro: true,
    prompt: `בנה כלי הצעות מחיר מקצועי עם Next.js + Tailwind.

פיצ'רים:
1. ספריית שירותים/מוצרים: הגדרת items חוזרים עם מחיר ברירת מחדל
2. בנאי הצעה:
   - גרור items מהספרייה לתוך ההצעה
   - עריכת כמות ומחיר per item
   - הוסף sections (כותרות)
   - תנאים ו-fine print
   - תוקף הצעה (X ימים)
3. Preview PDF מלא
4. שליחה במייל: mailto link עם PDF מצורף (base64)
5. Status tracking: Draft / Sent / Accepted / Declined
6. Template system: שמור הצעה כ-template לשימוש חוזר

סה"כ: חישוב אוטומטי לפני/אחרי מע"מ`,
  },
  {
    id: 'feedback-board',
    title: 'לוח פידבק משתמשים',
    description: 'כלי לאיסוף, מיון ותעדוף פידבק מלקוחות',
    category: 'business',
    tags: ['feedback', 'product', 'roadmap'],
    isPro: true,
    prompt: `בנה לוח פידבק ציבורי (כמו Canny) עם Next.js + Tailwind + localStorage.

מסכים:
1. ציבורי (/): רשימת בקשות פיצ'רים, sort: Trending/New/Top, filter סטטוס
2. כרטיסיית בקשה: כותרת, תיאור, votes, comments, status badge, upvote button
3. הוסף בקשה: modal עם title + description + category
4. Admin (/admin): ניהול סטטוסים (Under Review / Planned / In Progress / Done / Declined)

פיצ'רים:
- Upvote עם localStorage (מניעת כפל)
- Comment thread (nested level אחד)
- Changelog: רשימת עדכונים שנשלחו
- Subscribe לעדכונים (אימייל field, localStorage)
- Trending algorithm: votes / (hours_since_posted)^1.5`,
  },
  {
    id: 'team-standup',
    title: 'כלי Standup יומי',
    description: 'ניהול standup meetings עם timer, היסטוריה ו-export',
    category: 'business',
    tags: ['team', 'meeting', 'productivity'],
    isPro: true,
    prompt: `בנה כלי standup יומי עם React + Tailwind.

פיצ'רים:
1. Team setup: הגדר חברי צוות עם שם וצבע
2. Standup session:
   - רשימת חברי צוות עם timer לכל אחד (ברירת מחדל 2 דק')
   - Timer מסתובב בין חברים
   - כל חבר: 3 שדות - Yesterday / Today / Blockers
   - Progress bar לכל הישיבה
3. סיכום: כל התשובות + export כ-Slack message / email
4. היסטוריה: ישיבות קודמות עם חיפוש
5. הגדרות: timer לכל חבר, שעת standup, notification

State: useReducer, localStorage`,
  },
  {
    id: 'expense-tracker',
    title: 'מעקב הוצאות',
    description: 'ניהול הוצאות עם קטגוריות, גרפים ו-budget alerts',
    category: 'business',
    tags: ['finance', 'expenses', 'budget'],
    isPro: false,
    prompt: `בנה אפליקציית מעקב הוצאות עם React + Recharts + Tailwind.

מסכים:
1. Dashboard: סיכום חודשי, top categories, הוצאות אחרונות
2. הוצאות: רשימה עם filter חודש/קטגוריה, search, sort
3. הוסף הוצאה: amount, category, date, note, receipt photo (base64)
4. Budget: קביעת תקציב לכל קטגוריה + alert ב-80%/100%
5. ניתוח: גרף עוגה קטגוריות, AreaChart מגמה חודשית, השוואה לחודש קודם

קטגוריות: 🍕 אוכל, 🚗 תחבורה, 🛍️ קניות, 💊 בריאות, 🎬 בילויים, 📚 חינוך, 🏠 דיור

Storage: localStorage עם export/import JSON`,
  },
  // ── CONTENT ──────────────────────────────────────────────────────────
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot עם Claude',
    description: 'chatbot מלא עם streaming, conversations ו-system prompt מותאם',
    category: 'content',
    tags: ['ai', 'claude', 'chatbot'],
    isPro: false,
    prompt: `בנה AI chatbot עם Next.js 15 + Tailwind + Claude API (Streaming).

UI:
1. Sidebar שמאל: רשימת conversations, כפתור "שיחה חדשה", search
2. Main: chat messages area + input bar תחתון
3. Message bubble: משתמש (ימין, כחול) / AI (שמאל, אפור)
4. Streaming: הודעת AI מופיעה token אחרי token (typewriter effect)
5. Markdown rendering בהודעות AI (react-markdown)
6. Copy button על כל הודעה
7. Settings: system prompt מותאם, model selector, temperature slider
8. Code blocks עם syntax highlighting + copy

API route (/api/chat):
- POST עם messages[] + system
- Response: ReadableStream (SSE)
- Error handling: rate limit, context overflow

localStorage: שמירת כל conversations`,
  },
  {
    id: 'newsletter-template',
    title: 'בנאי Newsletter',
    description: 'בנאי visual לניוזלטרים עם templates ו-HTML export',
    category: 'content',
    tags: ['email', 'newsletter', 'builder'],
    isPro: true,
    prompt: `בנה בנאי ניוזלטרים visual עם React + Tailwind (drag-and-drop blocks).

Blocks זמינים:
- Header עם לוגו + אחריות
- Hero image + כותרת + כפתור CTA
- פסקת טקסט (rich text editor פשוט)
- כפתור CTA standalone
- 2 עמודות (תמונה + טקסט)
- Divider
- Social links
- Footer עם unsubscribe link

פיצ'רים:
- גרור blocks לסידור מחדש (dnd-kit)
- לחץ block לעריכה inline
- Color picker לצבעי brand
- Mobile preview toggle
- Export: HTML email-safe (inline styles, table layout)
- 5 templates מוכנים לבחירה`,
  },
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    description: 'בסיס ידע עם קטגוריות, חיפוש מלא ו-markdown rendering',
    category: 'content',
    tags: ['docs', 'knowledge', 'search'],
    isPro: true,
    prompt: `בנה knowledge base / documentation site עם Next.js + Tailwind + MDX.

מבנה:
- /app/page.tsx: search גדול + קטגוריות + articles פופולריים
- /app/[category]/page.tsx: רשימת מאמרים בקטגוריה
- /app/[category]/[article]/page.tsx: תוכן מאמר

פיצ'רים:
- Fuzzy search מלא על כל התוכן (Fuse.js)
- Table of contents אוטומטי מ-headings
- Related articles בסוף
- Breadcrumbs
- "האם המאמר עזר?" thumbs up/down + comment
- Print-friendly CSS
- Copy anchor links
- Reading progress bar
- Last updated date מ-git

Sidebar: ניווט היררכי עם collapse/expand`,
  },
  {
    id: 'faq-page',
    title: 'דף FAQ אינטראקטיבי',
    description: 'FAQ עם חיפוש, קטגוריות ו-AI שמייצר תשובות',
    category: 'content',
    tags: ['faq', 'support', 'ai'],
    isPro: true,
    prompt: `בנה דף FAQ אינטראקטיבי עם React + Tailwind.

פיצ'רים:
1. חיפוש real-time שמסנן שאלות (highlight על match)
2. Tabs קטגוריות: כללי / מוצר / תשלום / טכני / חשבון
3. Accordion לכל שאלה עם אנימציה smooth
4. "לא מצאת תשובה?" → טופס יצירת קשר
5. Vote: כמה אנשים מצאו תשובה מועילה
6. Share: copy link לשאלה ספציפית (URL anchor)
7. Schema.org FAQPage markup ל-SEO

Content: 30 שאלות ותשובות placeholder מסווגות`,
  },
  {
    id: 'content-calendar',
    title: 'קלנדר תוכן',
    description: 'תכנון תוכן לסושיאל עם AI לייצור רעיונות',
    category: 'content',
    tags: ['social', 'content', 'planning'],
    isPro: true,
    prompt: `בנה קלנדר תוכן לסושיאל מדיה עם Next.js + Tailwind.

Views:
1. Calendar view: חודש עם פוסטים ב-drag and drop
2. List view: טבלה עם filter פלטפורמה/סטטוס
3. Create post: textarea, בחר פלטפורמות (Instagram/Twitter/LinkedIn/Facebook), תאריך, תגיות, status

פיצ'רים:
- Status: Idea / Draft / Scheduled / Published
- Platform icons עם צבע מותאם
- AI generate: "צור 5 רעיונות לתוכן על [נושא]" → Claude API
- Copy post לפלטפורמות שונות (ניסוח שונה לכל פלטפורמה)
- Best time to post לכל פלטפורמה (hardcoded data)
- Export לCSV

Storage: localStorage`,
  },
  // ── MOBILE ───────────────────────────────────────────────────────────
  {
    id: 'pwa-todo',
    title: 'PWA Todo App',
    description: 'todo app כ-PWA עם offline support, push notifications ו-sync',
    category: 'mobile',
    tags: ['todo', 'pwa', 'offline'],
    isPro: false,
    prompt: `בנה PWA Todo App עם Next.js + Tailwind.

PWA Setup:
- manifest.json: שם, icons, theme_color, display: standalone
- Service Worker: cache-first strategy עם workbox
- Offline page

App Features:
1. רשימות: צור/מחק/שנה שם רשימות
2. Tasks: הוסף/עריכה/מחיקה, drag reorder
3. פרטי task: תיאור, due date, priority (🔴🟡🟢), sub-tasks
4. מסננים: All / Active / Completed / Today / Week
5. Search
6. Dark mode (מכבד prefers-color-scheme)

Mobile UX:
- Swipe לימין: complete task
- Swipe לשמאל: delete task
- Bottom navigation bar
- Pull to refresh
- Haptic feedback (vibrate API)
- Push notification לdue dates`,
  },
  {
    id: 'habit-tracker',
    title: 'מעקב הרגלים',
    description: 'מעקב הרגלים יומי עם streaks, stats ו-motivational design',
    category: 'mobile',
    tags: ['habits', 'streak', 'health'],
    isPro: true,
    prompt: `בנה habit tracker mobile-first עם React + Tailwind.

פיצ'רים:
1. Add habit: שם, צבע, אייקון emoji, תדירות (יומי/שבועי/ימים מסוימים), תזכורת שעה
2. Today view: כרטיסיות הרגלים עם checkbox גדול, streak counter
3. Calendar view: grid של 30 יום עם ✅/❌ לכל יום
4. Stats: streak הנוכחי, streak הארוך, completion rate, heatmap שנתי
5. Celebration: אנימציה (confetti) ב-completion ובmilestones (7/30/100 ימים)
6. רמות: Beginner / Consistent / Master (badge system)

Design: צבעוני, motivational, emojis גדולים, progress rings
Storage: localStorage עם עיצוב נתונים יעיל`,
  },
  {
    id: 'recipe-app',
    title: 'אפליקציית מתכונים',
    description: 'מנהל מתכונים עם חיפוש, תכנון ארוחות ורשימת קניות',
    category: 'mobile',
    tags: ['food', 'recipes', 'meal-planning'],
    isPro: true,
    prompt: `בנה אפליקציית מתכונים mobile-first עם React + Tailwind.

מסכים:
1. Home: מתכונים מומלצים, search, קטגוריות (ארוחת בוקר/צהריים/ערב/קינוח)
2. Recipe detail: תמונה, מרכיבים (עם adjust serving size), הוראות step-by-step
3. Add/Edit recipe: form מלא עם photo upload
4. Meal planner: שבוע × 3 ארוחות, drag-and-drop מתכונים
5. Shopping list: מרכיבים אוטומטי מתוכנית הארוחות + manual add, checkbox

UX:
- Step-by-step mode: מסך מלא, גדול, wake lock
- Scale מרכיבים: slider × 0.5/1/2/3
- Timer לכל שלב (in-app timer)
- Favorite + collections
- Import מ-URL (parse recipe page)

Storage: IndexedDB (לתמונות) + localStorage`,
  },
  {
    id: 'fitness-timer',
    title: 'טיימר אימון',
    description: 'טיימר HIIT/Tabata עם שמע, רטט ו-custom workouts',
    category: 'mobile',
    tags: ['fitness', 'timer', 'hiit'],
    isPro: true,
    prompt: `בנה טיימר אימון HIIT עם React + Tailwind.

מצבים:
1. Tabata: 20 שניות עבודה / 10 שניות מנוחה × 8 סטים
2. AMRAP: זמן כולל עם counter סטים
3. EMOM: כל דקה על הדקה
4. Custom: הגדר intervals ידני (שם, זמן, צבע) כמה שרוצה

UI:
- עיגול טיימר גדול עם progress ring SVG
- צבע שונה: ירוק=עבודה, אדום=מנוחה, צהוב=get ready
- רטט (Vibration API) ב-countdown (5,4,3,2,1)
- Audio cue: Web Audio API (beep מסונתז)
- הוראת תרגיל נוכחי (טקסט גדול)
- קדימה/אחורה interval ידני
- Pause / Resume
- Lock screen (wake lock API)

Workout presets: 5 אימונים מוכנים`,
  },
  {
    id: 'budget-split',
    title: 'מפצל הוצאות טיול',
    description: 'חלוקת הוצאות בין חבר"ה עם סכום לתשלום לכל אחד',
    category: 'mobile',
    tags: ['travel', 'split', 'finance'],
    isPro: true,
    prompt: `בנה מפצל הוצאות לטיולים עם React + Tailwind.

Flow:
1. יצירת קבוצה: שם הטיול + רשימת משתתפים (עם צבעים)
2. הוסף הוצאה: סכום, קטגוריה, מי שילם, על מי לחלק (כולם / בחר)
3. חלוקה: שווה / לפי % / סכומים ידניים
4. Summary screen:
   - כמה כל אחד שילם
   - כמה כל אחד חייב/זכאי
   - "Settle Up": חישוב העברות מינימליות (debt simplification algorithm)
   - רשימת העברות: "דן משלם לשרה 120₪"
5. Export: PDF / Whatsapp message

Currencies: תמיכה במטבעות שונים עם שער המרה

Storage: localStorage, URL sharing לטעינת קבוצה`,
  },
  {
    id: 'flashcard-app',
    title: 'אפליקציית כרטיסיות לימוד',
    description: 'כרטיסיות עם spaced repetition, קבוצות ו-AI לייצור שאלות',
    category: 'mobile',
    tags: ['learning', 'study', 'ai'],
    isPro: true,
    prompt: `בנה flashcard app mobile-first עם React + Tailwind.

פיצ'רים:
1. Decks: יצירה/עריכה/מחיקה של חפיסות כרטיסיות
2. Card: שאלה (קדמי) + תשובה (אחורי) + תמונה אופציונלית + tags
3. Study mode:
   - Flip animation (CSS 3D transform)
   - דירוג: Again / Hard / Good / Easy (Leitner system)
   - Progress bar session
4. Spaced Repetition: SM-2 algorithm - מתי לחזור על כל כרטיסייה
5. Stats: כרטיסיות ללמוד היום, streak, accuracy rate
6. AI generate: "צור 10 כרטיסיות על [נושא]" → Claude API
7. Import: CSV/JSON של כרטיסיות
8. Share deck: export JSON + QR לייבוא

Storage: localStorage עם migration support`,
  },
  // ── INTERNAL ─────────────────────────────────────────────────────────
  {
    id: 'admin-dashboard',
    title: 'Admin Dashboard',
    description: 'לוח בקרה admin עם stats, טבלאות ו-user management',
    category: 'internal',
    tags: ['admin', 'dashboard', 'analytics'],
    isPro: true,
    prompt: `בנה admin dashboard עם Next.js + Tailwind + Recharts.

Layout: Sidebar ניווט + Header + Main content

עמודים:
1. Overview: KPI cards (משתמשים, הכנסות, orders, conversion), Line chart הכנסות, Pie chart קטגוריות
2. Users: DataTable עם avatar, email, role, status, joined date. Actions: view/edit/ban/delete
3. Orders: טבלה עם order ID, לקוח, סכום, status badge, תאריך. Filter + export CSV
4. Analytics: Bar chart יומי/שבועי/חודשי, funnel chart, metrics
5. Settings: site settings form, email templates, integrations

Components:
- StatCard עם trend indicator (↑↓ %)
- DataTable generic עם sort/filter/pagination
- StatusBadge (Active/Suspended/Pending)
- DateRangePicker
- Notification drawer

Data: mock data ריאלי (200+ records)`,
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    description: 'Kanban board מלא עם drag-and-drop, labels ו-filters',
    category: 'internal',
    tags: ['kanban', 'project', 'tasks'],
    isPro: false,
    prompt: `בנה Kanban board עם React + Tailwind + dnd-kit.

פיצ'רים:
- עמודות: Todo / In Progress / In Review / Done (הוסף/שנה שם/מחק)
- כרטיסיות: כותרת, תיאור, assignee (avatar), priority, labels, due date, comments count
- Drag & Drop: כרטיסיות בין עמודות ובתוך עמודה (reorder)
- Quick add: כפתור + בכל עמודה, פתח inline input
- Modal פרטים: edit מלא, comments, activity log, attachments
- Labels: צבעים מותאמים, filter לפי label
- Filters: assignee, priority, label, due date
- Search global
- WIP limit: max cards לעמודה (warning כשעוברים)
- Board settings: שינוי עמודות, colors

Storage: localStorage`,
  },
  {
    id: 'time-tracker',
    title: 'מעקב זמן לפרויקטים',
    description: 'time tracking עם פרויקטים, timer חי, דוחות ו-export',
    category: 'internal',
    tags: ['time', 'tracking', 'billing'],
    isPro: true,
    prompt: `בנה time tracker עם React + Tailwind + Recharts.

פיצ'רים:
1. Projects: צור/עריכה/ארכיב פרויקטים עם צבע + לקוח + תעריף שעתי
2. Timer: כפתור Start/Stop גדול, project selector, description, running timer בעמוד
3. Manual entry: הוסף כניסה ידנית עם start/end time
4. Today view: רשימת entries היום, סה"כ שעות, pie chart פרויקטים
5. Reports:
   - שבועי/חודשי/custom range
   - BarChart שעות לפי יום
   - Grouped לפי פרויקט עם עלות (שעות × תעריף)
   - Export CSV/PDF
6. Invoice generator: מRetime entries → חשבונית (PDF)

UX: Timer רץ ב-sessionStorage, הודעה אם שכחת לכבות`,
  },
  {
    id: 'link-shortener',
    title: 'מקצר קישורים',
    description: 'מקצר URLs עם analytics, QR ו-custom slugs',
    category: 'internal',
    tags: ['url', 'shortener', 'analytics'],
    isPro: true,
    prompt: `בנה URL shortener עם Next.js + Tailwind.

Pages:
- / : טופס קיצור URL (long URL + optional custom slug)
- /dashboard: כל הקישורים + stats
- /[slug]: redirect (API route)

API Routes:
- POST /api/shorten: קצר URL, החזר slug
- GET /api/[slug]: redirect + log click
- GET /api/stats/[slug]: analytics

Features:
- Custom slug (אם לא תפוס)
- QR code לכל קישור
- Click counter + unique visitors (by IP hash)
- Expiry date אופציונלי
- Password protection
- Bulk shorten (CSV upload)
- Top referrers

Storage: JSON file (ב-/data) ← ללא DB לפשטות`,
  },
  {
    id: 'form-builder',
    title: 'בנאי טפסים',
    description: 'drag-and-drop form builder עם logic, validation ו-submission analytics',
    category: 'internal',
    tags: ['forms', 'builder', 'no-code'],
    isPro: true,
    prompt: `בנה form builder visual עם React + Tailwind + dnd-kit.

Field types: Text, Email, Phone, Number, Textarea, Select, Multi-select, Checkbox, Radio, Date, File upload, Rating, Signature

Builder UI:
- שמאל: palette של field types
- מרכז: form canvas עם drag-and-drop
- ימין: properties panel לfield הנבחר (label, placeholder, required, validation)

פיצ'רים:
- Conditional logic: הצג field X אם field Y = Z
- Multi-step form (wizard) עם progress
- Preview mode
- Form settings: כותרת, description, success message, redirect URL
- Validation rules: min/max length, regex, custom error

Embed: generate iframe snippet
Responses: טבלה + export CSV
Analytics: completion rate, avg time, drop-off per step`,
  },
];

export function getPromptsByCategory(category: Category | 'all'): Prompt[] {
  if (category === 'all') return PROMPTS;
  return PROMPTS.filter((p) => p.category === category);
}

export function searchPrompts(query: string): Prompt[] {
  const q = query.toLowerCase().trim();
  if (!q) return PROMPTS;
  return PROMPTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)),
  );
}
