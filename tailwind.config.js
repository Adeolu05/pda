/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: 'var(--bg)',
                surface: 'var(--surface)',
                raised: 'var(--raised)',
                ink: 'var(--ink)',
                muted: 'var(--muted)',
                faint: 'var(--faint)',
                line: 'var(--line)',
                'line-2': 'var(--line-2)',
                'line-input': 'var(--line-input)',
                accent: 'var(--accent)',
                focus: 'var(--focus)',
                success: 'var(--success)',
                warn: 'var(--warn)',
                danger: 'var(--danger)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            borderRadius: {
                card: '12px',
            },
            maxWidth: {
                site: '1200px',
                'site-xl': '1360px',
            },
            transitionTimingFunction: {
                out: 'cubic-bezier(.16,1,.3,1)',
            },
        },
    },
    plugins: [],
};
