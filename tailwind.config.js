const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // EdTech-specific semantic colors
        success: {
          light: '#E6F4EA',
          DEFAULT: '#34A853',
          dark: '#1E7E34',
        },
        info: {
          light: '#E8F0FE',
          DEFAULT: '#4285F4',
          dark: '#2B579A',
        },
        warning: {
          light: '#FEF7E0',
          DEFAULT: '#FBBC05',
          dark: '#F2994A',
        },
        error: {
          light: '#FCE8E6',
          DEFAULT: '#EA4335',
          dark: '#C5221F',
        },
        // Learning progress colors
        progress: {
          beginner: '#FFB6B9',
          intermediate: '#BBE1FA',
          advanced: '#98D8AA',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
      },
      fontSize: {
        // Improved type scale for better readability
        'display-lg': ['3.815rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-md': ['3.052rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['2.441rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-lg': ['1.953rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-md': ['1.563rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        // Consistent spacing scale
        '4xs': '0.125rem',  // 2px
        '3xs': '0.25rem',   // 4px
        '2xs': '0.375rem',  // 6px
        'xs': '0.5rem',     // 8px
        'sm': '0.75rem',    // 12px
        'md': '1rem',       // 16px
        'lg': '1.5rem',     // 24px
        'xl': '2rem',       // 32px
        '2xl': '2.5rem',    // 40px
        '3xl': '3rem',      // 48px
        '4xl': '4rem',      // 64px
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'progress-fill': 'progress-fill 1s ease-in-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'progress-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
