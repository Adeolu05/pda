import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../config/constants';

const Navbar: React.FC = () => {
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowNav(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = target.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <AnimatePresence>
            {showNav && (
                <motion.nav
                    initial={{ y: -100, x: '-50%', opacity: 0 }}
                    animate={{ y: 0, x: '-50%', opacity: 1 }}
                    exit={{ y: -100, x: '-50%', opacity: 0 }}
                    className="fixed top-6 left-1/2 z-50 bg-white/70 backdrop-blur-xl px-2 py-2 rounded-full border border-slate-200 shadow-2xl flex gap-1 font-black text-[10px] uppercase tracking-[0.2em]"
                >
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="px-6 py-2 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300"
                        >
                            {item.label}
                        </a>
                    ))}
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
