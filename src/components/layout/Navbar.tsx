import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../config/constants';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
                scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
            }`}
        >
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
            >
                Skip to content
            </a>
            <nav aria-label="Main" className="container-site flex h-16 items-center justify-between">
                <a href="#top" className="font-mono text-[14px] font-medium text-ink" aria-label="dpeluola.com, back to top">
                    dpeluola<span className="text-accent">.</span>com
                </a>

                <ul className="hidden items-center gap-1 md:flex">
                    {NAV_ITEMS.filter((i) => i.href !== '#contact').map((item) => (
                        <li key={item.href}>
                            <a href={item.href} className="rounded-md px-3 py-2 text-[14px] text-muted transition-colors hover:text-ink">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <a href="#contact" className="btn-primary hidden !py-2 sm:inline-flex">
                        Start a project
                    </a>
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line-2 text-ink md:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
                    </button>
                </div>
            </nav>

            {open && (
                <div id="mobile-menu" className="border-t border-line md:hidden">
                    <ul className="container-site flex flex-col py-3">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-md px-1 py-3 text-[16px] text-ink hover:text-accent"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
