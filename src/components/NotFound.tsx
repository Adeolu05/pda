import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { NAV_ITEMS } from '../config/constants';

/** Static 404 page, pre-rendered to dist/404.html. Links are absolute because it can show on any path. */
const NotFound: React.FC = () => (
    <main id="main" className="flex min-h-screen flex-col">
        <header className="border-b border-line">
            <div className="container-site flex h-16 items-center">
                <a href="/" className="font-mono text-[14px] font-medium text-ink">
                    dpeluola<span className="text-accent">.</span>com
                </a>
            </div>
        </header>
        <div className="container-site flex flex-1 flex-col items-start justify-center py-24">
            <p className="bg-gradient-to-b from-white/25 to-white/5 bg-clip-text text-[clamp(5rem,18vw,9rem)] font-medium leading-none tracking-[-0.05em] text-transparent">
                404
            </p>
            <h1 className="mt-6 text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">Page not found.</h1>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted">
                The link may be old or mistyped. Everything lives on one page, so start there.
            </p>
            <a href="/" className="btn-primary mt-8">
                <ArrowLeft className="h-4 w-4" aria-hidden /> Back to dpeluola.com
            </a>
            <nav aria-label="Sections" className="mt-10">
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {NAV_ITEMS.map((i) => (
                        <li key={i.href}>
                            <a href={`/${i.href}`} className="text-[14px] text-muted hover:text-ink">
                                {i.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </main>
);

export default NotFound;
