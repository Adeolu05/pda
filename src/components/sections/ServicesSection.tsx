import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../../utils/scrollToSection';

type ServiceVisual = 'landing' | 'business' | 'catalogue' | 'web3';

type Service = {
    title: string;
    desc: string;
    bullets: string[];
    rotate: number;
    visual: ServiceVisual;
    surface: string;
    accent: string;
    ring: string;
};

const SERVICES: Service[] = [
    {
        title: 'Custom Web Application Development',
        desc: 'End-to-end development of robust, production-ready web applications tailored to your specific business logic and user needs.',
        bullets: ['Full-stack architecture from data to interface', 'Production-ready for teams who need to ship, not prototype'],
        rotate: -1.8,
        visual: 'business',
        surface: 'from-sky-200/70 via-indigo-50 to-violet-100/80',
        accent: '#4F46E5',
        ring: 'from-indigo-400/45 via-sky-300/35 to-violet-400/40',
    },
    {
        title: 'E-Commerce & Full-Stack Solutions',
        desc: 'High-conversion online stores and comprehensive full-stack platforms built for speed, reliability, and seamless user experiences.',
        bullets: ['WooCommerce and custom commerce architectures', 'Inventory, merchandising and checkout your ops team can run'],
        rotate: 1.6,
        visual: 'catalogue',
        surface: 'from-emerald-100/80 via-teal-50/90 to-violet-100/60',
        accent: '#059669',
        ring: 'from-emerald-400/40 via-teal-300/30 to-violet-400/35',
    },
    {
        title: 'Landing Page Design & Optimization',
        desc: 'Bespoke, high-craft landing pages combining editorial UI/UX polish with modern architecture to elevate brand prestige and drive conversions.',
        bullets: ['Offer and proof visible above the fold', 'Fast handoff so you can iterate without rework'],
        rotate: -1.4,
        visual: 'landing',
        surface: 'from-violet-200/90 via-violet-50 to-fuchsia-100/70',
        accent: '#7C3AED',
        ring: 'from-violet-400/50 via-fuchsia-300/35 to-violet-500/40',
    },
    {
        title: 'Web3 & Digital Experiences',
        desc: 'Bridging cutting-edge decentralized technology with fluid, accessible user interfaces for startups and communities.',
        bullets: ['Layouts for skeptical or first-time audiences', 'Responsive systems across docs and marketing'],
        rotate: 2.2,
        visual: 'web3',
        surface: 'from-fuchsia-200/70 via-violet-50 to-indigo-100/75',
        accent: '#A855F7',
        ring: 'from-fuchsia-400/45 via-violet-400/40 to-indigo-400/35',
    },
];

function ServiceVisual({ visual, accent }: { visual: ServiceVisual; accent: string }) {
    if (visual === 'landing') {
        return (
            <div className="relative mx-auto h-full w-[82%] pt-5">
                <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
                    <div className="mb-2 h-2 w-1/2 rounded-full" style={{ backgroundColor: `${accent}33` }} />
                    <div
                        className="mb-2 h-14 rounded-xl"
                        style={{ background: `linear-gradient(135deg, ${accent}44, ${accent}18)` }}
                    />
                    <div className="h-7 rounded-lg bg-slate-900/[0.07]" />
                    <div className="mt-2 flex justify-center">
                        <span
                            className="rounded-full px-4 py-1 text-[9px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: accent }}
                        >
                            CTA
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (visual === 'business') {
        return (
            <div className="relative mx-auto grid h-full w-[84%] grid-cols-2 gap-2 pt-6">
                {[0, 1, 2, 3].map((n) => (
                    <div
                        key={n}
                        className="rounded-xl border border-white/60 bg-white/75 p-2 shadow-sm"
                        style={{ opacity: n === 0 ? 1 : 0.55 + n * 0.12 }}
                    >
                        <div className="h-1.5 w-2/3 rounded-full bg-slate-200/90" />
                        <div
                            className="mt-1.5 h-8 rounded-lg"
                            style={{ backgroundColor: n === 0 ? `${accent}28` : '#E2E8F0' }}
                        />
                    </div>
                ))}
            </div>
        );
    }

    if (visual === 'catalogue') {
        return (
            <div className="relative mx-auto flex h-full w-[86%] gap-2 pt-6">
                {[0, 1, 2].map((n) => (
                    <div
                        key={n}
                        className="flex-1 overflow-hidden rounded-xl border border-white/65 bg-white/80 shadow-sm"
                    >
                        <div
                            className="aspect-square"
                            style={{
                                background: `linear-gradient(145deg, ${accent}${n === 0 ? '55' : '22'}, transparent)`,
                            }}
                        />
                        <div className="p-1.5">
                            <div className="h-1 w-full rounded-full bg-slate-200/80" />
                        </div>
                    </div>
                ))}
                <span
                    className="absolute -bottom-0.5 right-2 h-8 w-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: '#25D366' }}
                    aria-hidden
                />
            </div>
        );
    }

    return (
        <div className="relative mx-auto flex h-full w-[80%] items-center justify-center gap-3 pt-6">
            <div className="relative h-20 w-20">
                <span
                    className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: `${accent}40` }}
                />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, n) => (
                    <span
                        key={deg}
                        className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                            backgroundColor: n % 2 === 0 ? accent : '#C4B5FD',
                            transform: `rotate(${deg}deg) translateY(-2.25rem)`,
                        }}
                    />
                ))}
            </div>
            <div className="flex-1 space-y-2 rounded-2xl border border-white/65 bg-white/75 p-3 shadow-sm">
                <div className="h-2 w-full rounded-full bg-slate-900/10" />
                <div className="h-2 w-4/5 rounded-full bg-slate-900/[0.06]" />
                <div className="h-10 rounded-xl" style={{ background: `linear-gradient(90deg, ${accent}33, transparent)` }} />
            </div>
        </div>
    );
}

const ServicesSection: React.FC = () => {
    const reduceMotion = useReducedMotion();

    return (
        <div id="services" className="scroll-mt-28">
            <section className="relative overflow-hidden rounded-[2rem] bg-[#F4F2FA] px-4 py-10 sm:px-6 sm:py-12 md:rounded-[2.75rem] md:px-10 md:py-14 lg:px-12 lg:py-16">
                <div
                    className="pointer-events-none absolute -left-[10%] top-[8%] h-[min(44vw,18rem)] w-[min(44vw,18rem)] rounded-[58%_42%_35%_65%_/_52%_48%_62%_38%] bg-violet-400/25 blur-[1px] md:h-64 md:w-64"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute -right-[8%] bottom-[6%] h-[min(40vw,16rem)] w-[min(40vw,16rem)] rounded-[42%_58%_70%_30%_/_45%_55%_45%_55%] bg-lime-300/30 blur-[1px] md:h-56 md:w-56"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute right-[20%] top-[38%] h-48 w-64 rounded-full bg-fuchsia-400/10 blur-3xl"
                    aria-hidden
                />

                <header className="relative mb-10 max-w-3xl md:mb-14 lg:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="ui-eyebrow mb-3"
                    >
                        Services
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-[clamp(2.05rem,5.5vw,3.35rem)] font-semibold not-italic leading-[1.06] tracking-tight text-slate-950"
                    >
                        What I build <span className="text-violet-600">for you</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.06 }}
                        className="mt-6 max-w-xl text-[15px] leading-[1.68] text-slate-800 md:text-[17px] md:leading-relaxed"
                    >
                        Each engagement maps to an outcome, pipeline, revenue signal, or operational relief, from
                        landing pages to full-stack applications and e-commerce, not decoration for its own sake.
                    </motion.p>
                </header>

                <div className="relative grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8 lg:gap-9">
                    {SERVICES.map((s, i) => (
                        <motion.article
                            key={s.title}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={
                                reduceMotion
                                    ? undefined
                                    : { rotate: 0, y: -8, transition: { type: 'spring', stiffness: 320, damping: 24 } }
                            }
                            style={{ rotate: reduceMotion ? 0 : s.rotate }}
                            className={`group relative flex h-full flex-col rounded-[1.9rem] bg-gradient-to-br p-px shadow-[0_20px_50px_-24px_rgba(15,23,42,0.16)] ${s.ring}`}
                        >
                            <div className="flex h-full flex-col overflow-hidden rounded-[1.85rem] bg-white md:rounded-[1.88rem]">
                                <div
                                    className={`relative h-[8.75rem] shrink-0 overflow-hidden bg-gradient-to-br sm:h-[9.5rem] ${s.surface}`}
                                >
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-50"
                                        style={{
                                            backgroundImage:
                                                'radial-gradient(circle at 25% 15%, white 0%, transparent 42%), radial-gradient(circle at 85% 90%, rgba(255,255,255,0.55) 0%, transparent 38%)',
                                        }}
                                        aria-hidden
                                    />
                                    <ServiceVisual visual={s.visual} accent={s.accent} />
                                </div>

                                <div className="flex flex-1 flex-col p-7 md:p-8">
                                    <div className="mb-4">
                                        <span
                                            className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-full px-2.5 font-sans text-[11px] font-bold tabular-nums text-white shadow-sm"
                                            style={{ backgroundColor: s.accent }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-violet-800 md:text-[1.3rem]">
                                        {s.title}
                                    </h3>

                                    <div
                                        className="mt-3 h-px w-12 transition-[width] duration-500 group-hover:w-20"
                                        style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
                                        aria-hidden
                                    />

                                    <p className="mt-4 flex-1 text-[16px] leading-relaxed text-slate-800 md:text-[17px] md:leading-relaxed">
                                        {s.desc}
                                    </p>

                                    <ul className="mt-7 space-y-2.5 border-t border-slate-100/90 pt-6">
                                        {s.bullets.map((b) => (
                                            <li
                                                key={b}
                                                className="flex gap-3 text-[15px] leading-snug text-slate-900 md:text-[16px]"
                                            >
                                                <span
                                                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                                    style={{ backgroundColor: s.accent }}
                                                    aria-hidden
                                                />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mx-auto mt-12 max-w-xl rounded-2xl border border-white/80 bg-white/75 px-6 py-5 text-center shadow-[0_16px_40px_-28px_rgba(124,58,237,0.2)] backdrop-blur-sm md:mt-16 md:px-8 md:py-6"
                >
                    <p className="text-[15px] leading-relaxed text-slate-800 md:text-[16px]">
                        Need a blend of the above?{' '}
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="inline-flex items-center gap-1 font-semibold text-violet-700 underline decoration-violet-200 underline-offset-[5px] transition-colors hover:text-violet-900"
                        >
                            Send scope and deadline
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </a>
                        <span className="text-slate-600">, replies within two business days when slots are open.</span>
                    </p>
                </motion.div>
            </section>
        </div>
    );
};

export default ServicesSection;
