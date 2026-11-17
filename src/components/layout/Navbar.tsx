import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Github, Linkedin } from 'lucide-react';
import { CONTACT_INFO, NAV_ITEMS, SOCIAL_LINKS } from '../../config/constants';
import XIcon from '../common/XIcon';
import TelegramIcon from '../common/TelegramIcon';
import { ExternalLink } from '../common/ui';

const SECTION_IDS = NAV_ITEMS.map((i) => i.href.slice(1));

/** Highlights the nav link for the section in the middle of the screen. */
function useActiveSection() {
    const [active, setActive] = useState('');
    useEffect(() => {
        const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
        if (!els.length) return;
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );
        els.forEach((el) => io.observe(el));
        const onTop = () => window.scrollY < 200 && setActive('');
        window.addEventListener('scroll', onTop, { passive: true });
        return () => {
            io.disconnect();
            window.removeEventListener('scroll', onTop);
        };
    }, []);
    return active;
}

/** Two lines that turn into an X. */
const MenuIcon: React.FC<{ open: boolean }> = ({ open }) => (
    <span className="relative block h-3 w-[18px]" aria-hidden>
        <span
            className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out ${
                open ? 'top-[5px] rotate-45' : 'top-0'
            }`}
        />
        <span
            className={`absolute left-0 h-[1.5px] rounded-full bg-current transition-all duration-300 ease-out ${
                open ? 'top-[5px] w-full -rotate-45' : 'top-[10px] w-[12px]'
            }`}
        />
    </span>
);

const socials = [
    { Icon: XIcon, href: SOCIAL_LINKS.twitter, label: 'X' },
    { Icon: TelegramIcon, href: SOCIAL_LINKS.telegram, label: 'Telegram' },
    { Icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { Icon: Linkedin, href: SOCIAL_LINKS.linkedIn, label: 'LinkedIn' },
];

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const active = useActiveSection();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // While the menu is open: lock page scroll, close on Esc or when the screen grows to desktop size.
    useEffect(() => {
        if (!open) return;
        const html = document.documentElement;
        const prev = html.style.overflow;
        html.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };
        const mq = window.matchMedia('(min-width: 768px)');
        const onMq = () => mq.matches && setOpen(false);
        window.addEventListener('keydown', onKey);
        mq.addEventListener('change', onMq);
        const t = window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 50);
        return () => {
            html.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
            mq.removeEventListener('change', onMq);
            window.clearTimeout(t);
        };
    }, [open]);

    const close = () => setOpen(false);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
                open ? 'border-b border-line bg-bg' : scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
            }`}
        >
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
            >
                Skip to content
            </a>
            <nav aria-label="Main" className="container-site flex h-16 items-center justify-between">
                <a href="#top" onClick={close} className="font-mono text-[14px] font-medium text-ink" aria-label="dpeluola.com, back to top">
                    dpeluola<span className="text-accent">.</span>com
                </a>

                <ul className="hidden items-center gap-1 md:flex">
                    {NAV_ITEMS.filter((i) => i.href !== '#contact').map((item) => {
                        const isActive = active === item.href.slice(1);
                        return (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    aria-current={isActive ? 'location' : undefined}
                                    className={`relative rounded-md px-3 py-2 text-[14px] transition-colors hover:text-ink ${
                                        isActive ? 'text-ink' : 'text-muted'
                                    }`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-opacity duration-300 ${
                                            isActive ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        aria-hidden
                                    />
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center gap-2">
                    <a href="#contact" className="btn-primary hidden !py-2 sm:inline-flex">
                        Start a project
                    </a>
                    <button
                        ref={buttonRef}
                        type="button"
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border text-ink transition-colors md:hidden ${
                            open ? 'border-line-input bg-raised' : 'border-line-2 hover:bg-raised'
                        }`}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <MenuIcon open={open} />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-menu"
                        key="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto overscroll-contain bg-bg md:hidden"
                    >
                        <div className="container-site flex min-h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
                            <p className="eyebrow">Menu</p>
                            <ul className="mt-3">
                                {NAV_ITEMS.map((item, i) => {
                                    const isActive = active === item.href.slice(1);
                                    return (
                                        <motion.li
                                            key={item.href}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.04 + i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            className="border-b border-line"
                                        >
                                            <a
                                                ref={i === 0 ? firstLinkRef : undefined}
                                                href={item.href}
                                                onClick={close}
                                                aria-current={isActive ? 'location' : undefined}
                                                className="group flex items-baseline gap-4 py-4 [@media(max-height:720px)]:py-2.5"
                                            >
                                                <span className={`font-mono text-[12px] ${isActive ? 'text-accent' : 'text-faint'}`}>
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <span
                                                    className={`text-[26px] font-medium tracking-[-0.025em] [@media(max-height:720px)]:text-[22px] transition-colors group-hover:text-ink ${
                                                        isActive ? 'text-ink' : 'text-muted'
                                                    }`}
                                                >
                                                    {item.label}
                                                </span>
                                                {isActive && (
                                                    <span className="ml-auto self-center font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                                                        here
                                                    </span>
                                                )}
                                            </a>
                                        </motion.li>
                                    );
                                })}
                            </ul>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.26, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-auto space-y-3 pt-10 [@media(max-height:720px)]:pt-6"
                            >
                                <p className="inline-flex items-center gap-2 font-mono text-[12px] text-muted">
                                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                                    Available for new projects
                                </p>
                                <a href="#contact" onClick={close} className="btn-primary w-full !py-3 text-[15px]">
                                    Start a project <ArrowRight className="h-4 w-4" aria-hidden />
                                </a>
                                <ExternalLink href={CONTACT_INFO.bookingUrl} onClick={close} className="btn-secondary w-full !py-3 text-[15px]">
                                    <CalendarDays className="h-4 w-4" aria-hidden /> Book a free 15-minute call
                                </ExternalLink>
                                <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-[14px] text-muted hover:text-ink">
                                        {CONTACT_INFO.email}
                                    </a>
                                    <ul className="flex gap-1.5" aria-label="Social profiles">
                                        {socials.map(({ Icon, href, label }) => (
                                            <li key={label}>
                                                <ExternalLink
                                                    href={href}
                                                    aria-label={label}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-2 text-muted transition-colors hover:bg-raised hover:text-ink"
                                                >
                                                    <Icon className="h-4 w-4" />
                                                </ExternalLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
