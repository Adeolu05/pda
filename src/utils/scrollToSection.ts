import type React from 'react';

/** Aligns with section `scroll-mt-28` and origin hero offset (~80px). */
const HEADER_OFFSET = 80;

export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
    }
};
