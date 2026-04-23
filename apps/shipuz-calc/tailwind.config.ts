import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font-heebo)', 'system-ui', 'sans-serif'] },
      colors: {
        brand: {
          blue: '#1E3A5F',
          orange: '#F97316',
          'orange-light': '#FFF7ED',
          slate: '#64748B',
        },
      },
    },
  },
  plugins: [],
};
export default config;
