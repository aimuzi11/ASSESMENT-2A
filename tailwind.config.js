/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          100: '#FFFFFF',
          200: '#F8F9FA',
          300: '#F3F4F6',
          400: '#E5E7EB',
        },
        dark: {
          900: '#1A1A24',
          800: '#2C2C3A',
          700: '#404050',
        },
        blue: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#0F172A',
        },
        accent: {
          blue: '#1E40AF',
          blueLight: '#3B82F6',
          blueDark: '#1E3A8A',
        },
        urgency: {
          low: '#10B981',
          medium: '#F59E0B',
          high: '#EF4444',
        },
        status: {
          open: '#3B82F6',
          progress: '#F59E0B',
          resolved: '#10B981',
        }
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'draw-check': 'draw-check 0.5s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(239, 68, 68, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)' },
        },
        'draw-check': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
