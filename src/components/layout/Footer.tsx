import React from 'react';
import { SOCIAL_LINKS, CONTACT_INFO, NAV_ITEMS } from '../../config/constants';
import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import XIcon from '../common/XIcon';
import { scrollToSection } from '../../utils/scrollToSection';

const Footer: React.FC = () => {
    const socialLinks = [
        { Icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
        { Icon: Linkedin, href: SOCIAL_LINKS.linkedIn, label: 'LinkedIn' },
        { Icon: XIcon, href: SOCIAL_LINKS.twitter, label: 'X (Twitter)' },
        { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    ];

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative border-t border-slate-200/80">
            <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
                aria-hidden
            />
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-16 lg:px-12">
                <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
                    <div className="flex flex-col items-center gap-3 md:items-start">
                        <button
                            type="button"
                            onClick={scrollToTop}
                            className="font-display text-4xl italic text-slate-900 transition-colors hover:text-violet-700"
                            aria-label="Back to top"
                        >
                            {CONTACT_INFO.shortName}
                        </button>
                        <p className="max-w-xs text-[13px] leading-relaxed text-slate-500">
                            Premium websites, dashboards and Web3 interfaces, built to convert.
                        </p>
                    </div>

                    <nav
                        aria-label="Footer"
                        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-end"
                    >
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-violet-700"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-col items-center gap-6 border-t border-slate-100 pt-8 sm:flex-row sm:justify-between">
                    <p className="order-2 text-[10px] font-bold uppercase tracking-[0.34em] text-slate-400 sm:order-1">
                        © {new Date().getFullYear()}, {CONTACT_INFO.label}
                    </p>

                    <div className="order-1 flex items-center gap-3 sm:order-2">
                        {socialLinks.map(({ Icon, href, label }) => (
                            <motion.a
                                key={label}
                                whileHover={{ y: -3 }}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                            >
                                <Icon className="h-[18px] w-[18px]" aria-hidden />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="absolute bottom-6 right-4 hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-colors hover:border-violet-300 hover:text-violet-700 lg:right-12 lg:flex"
            >
                <ArrowUp className="h-4 w-4" aria-hidden />
            </button>
        </footer>
    );
};

export default Footer;
