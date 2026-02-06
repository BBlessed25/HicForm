import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        brand: 'hsl(var(--brand))',
        'brand-foreground': 'hsl(var(--brand-foreground))',
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        xl: '1.25rem',
        lg: '1rem',
        md: '0.75rem',
      },
      boxShadow: {
        soft: '0 12px 32px -16px hsl(var(--shadow) / 0.4)',
        medium: '0 18px 40px -18px hsl(var(--shadow) / 0.55)',
        hard: '0 26px 60px -24px hsl(var(--shadow) / 0.7)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '100% 100%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out both',
        'slide-up': 'slide-up 0.8s ease-out both',
        'scale-in': 'scale-in 0.6s ease-out both',
        'gradient-x': 'gradient-x 12s ease infinite',
        'gradient-y': 'gradient-y 12s ease infinite',
        'gradient-xy': 'gradient-xy 16s ease infinite',
      },
    },
  },
  plugins: [typography, forms, aspectRatio],
}
