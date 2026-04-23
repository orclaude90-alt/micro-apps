import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      colors: {
        brand: {
          purple: '#7C3AED',
          'purple-light': '#EDE9FE',
          cyan: '#06B6D4',
          dark: '#0F172A',
          'dark-card': '#1E293B',
          'dark-border': '#334155',
        },
      },
    },
  },
  plugins: [],
};
export default config;
