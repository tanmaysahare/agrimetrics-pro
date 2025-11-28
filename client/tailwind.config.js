/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#10b981', // Emerald-500
                    500: '#10b981',
                    600: '#059669',
                },
                secondary: {
                    DEFAULT: '#fbbf24', // Amber-400
                    400: '#fbbf24',
                },
                background: {
                    DEFAULT: '#0f172a', // Slate-900
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                }
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'slide-up': 'slide-up 0.5s ease-out',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 0 0px rgba(16, 185, 129, 0.7)' },
                    '50%': { opacity: .8, boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(10px)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                }
            },
            boxShadow: {
                'glow': '0 0 20px rgba(16, 185, 129, 0.5)',
                'glow-sm': '0 0 10px rgba(16, 185, 129, 0.3)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
