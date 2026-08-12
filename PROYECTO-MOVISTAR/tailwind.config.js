/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        movistar: {
          green: {
            DEFAULT: '#00A859',
            dark: '#008C4A',
            light: '#E6F7EF',
            glow: 'rgba(0, 168, 89, 0.15)',
          },
          blue: {
            DEFAULT: '#019df4',
            dark: '#0180c8',
            light: '#5bc4f8',
            soft: '#e6f6fe',
            navy: '#013d5e',
          },
          pink: {
            DEFAULT: '#e13c80',
            dark: '#c0306b',
            light: '#f7d0e5',
            glow: 'rgba(225, 60, 128, 0.20)',
          },
          gray: {
            DEFAULT: '#F5F7FA',
            light: '#FAFCFF',
            border: '#E2E8F0',
            dark: '#6C7A89',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'movistar-sm': '0 2px 8px rgba(1, 157, 244, 0.06)',
        'movistar-md': '0 4px 16px rgba(1, 157, 244, 0.10)',
        'movistar-lg': '0 10px 30px rgba(1, 157, 244, 0.14)',
        'movistar-glow': '0 0 20px rgba(0, 168, 89, 0.28)',
        'movistar-pink-glow': '0 0 20px rgba(225, 60, 128, 0.28)',
        'movistar-blue-glow': '0 0 20px rgba(1, 157, 244, 0.35)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
      }
    },
  },
  plugins: [],
}

