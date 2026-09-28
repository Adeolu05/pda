import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../config/constants';
import { scrollToSection } from '../../utils/scrollToSection';

const Navbar: React.FC = () => {
    const [showNav, setShowNav] = useState(false);
    const [activeHref, setActiveHref] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            setShowNav(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Highlight the nav section under the viewport midline; clear it inside unlisted
        // sections (Process, Proof) so a stale item doesn't stay lit.
        let frame = 0;
        const update = () => {
            frame = 0;
            const mid = window.innerHeight * 0.45;
            const hit = NAV_ITEMS.find((item) => {
                const rect = document.querySelector(item.href)?.getBoundingClientRect();
                return rect && rect.top <= mid && rect.bottom >= mid;
            });
            setActiveHref(hit?.href ?? '');
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <AnimatePresence>
            {showNav && (
                <motion.nav
                    initial={{ y: -100, x: '-50%', opacity: 0 }}
                    animate={{ y: 0, x: '-50%', opacity: 1 }}
                    exit={{ y: -100, x: '-50%', opacity: 0 }}
                    className="fixed top-4 left-1/2 z-50 flex max-w-[calc(100vw-1.5rem)] gap-0.5 overflow-x-auto rounded-full border border-slate-200 bg-white/70 px-1.5 py-1.5 font-black text-[9px] uppercase tracking-[0.16em] shadow-2xl backdrop-blur-xl no-scrollbar sm:top-6 sm:max-w-none sm:gap-1 sm:px-2 sm:py-2 sm:text-[10px] sm:tracking-[0.2em]"
                >
                    {NAV_ITEMS.map((item) => {
                        const active = activeHref === item.href;
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                aria-current={active ? 'true' : undefined}
                                className={`relative shrink-0 rounded-full px-3 py-2 transition-colors duration-300 sm:px-5 md:px-6 ${
                                    active
                                        ? 'text-white'
                                        : 'text-slate-700 hover:bg-slate-900 hover:text-white'
                                }`}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="nav-active-pill"
                                        className="absolute inset-0 -z-10 rounded-full bg-slate-900"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    />
                                )}
                                {item.label}
                            </a>
                        );
                    })}
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
