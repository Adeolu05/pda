/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    purple: "#7C3AED",
                    indigo: "#4F46E5",
                },
                bg: {
                    base: "#FAF9FF",
                },
                text: {
                    main: "#0F172A",
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['"Instrument Serif"', 'serif'],
            },
        },
    },
    plugins: [],
}
