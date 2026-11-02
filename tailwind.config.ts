import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fresh-red': 'var(--fresh-red, #E30613)',
        'deep-grey': 'var(--deep-grey, #5E5E5E)',
        'grey': 'var(--grey, #B3B3B3)',
        'ember': 'var(--ember, #3B0A10)',
        'ember-soft': 'var(--ember-soft, #5A1219)',
        'stone': 'var(--stone, #454548)',
        'mist': 'var(--mist, #F3F3F3)',
        'paper': 'var(--paper, #FFFFFF)',
        'brand-text': 'var(--text, #4A4A4A)',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-noto-bengali)', 'sans-serif'],
        display: ['var(--font-montserrat)', 'sans-serif'],
        bengali: ['var(--font-noto-bengali)', 'var(--font-hind-siliguri)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
    },
  },
  plugins: [],
}

export default config
