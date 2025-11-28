/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
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
                }
            },
        },
    },
    plugins: [],
}
