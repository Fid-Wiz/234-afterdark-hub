/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#c084fc',
          pink: '#f472b6',
          blue: '#60a5fa',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          from: {
            textShadow: '0 0 5px #c084fc, 0 0 10px #c084fc, 0 0 15px #c084fc'
          },
          to: {
            textShadow: '0 0 10px #c084fc, 0 0 20px #c084fc, 0 0 30px #c084fc'
          }
        }
      }
    },
  },
  plugins: [],
}