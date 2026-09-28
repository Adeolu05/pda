import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Quote, Star, Zap } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../../config/constants';

/** Credibility only, keep distinct from About (story / workflow). */
const PROOF: { line: string; accent: string }[] = [
    { line: 'Production URLs across commerce, launches and Web3, so you can verify quality in the browser.', accent: '#7C3AED' },
    { line: 'React / Next.js, WordPress, Tailwind and typed flows; disciplined deploys on Vercel.', accent: '#4F46E5' },
    { line: 'Comfortable shipping an MVP, then tightening with feedback and analytics.', accent: '#DB2777' },
    { line: 'Automation and Telegram tooling alongside full-stack delivery.', accent: '#0EA5E9' },
    { line: 'Hands-on Web3 education content (including Alephium-ecosystem work).', accent: '#16A34A' },
];

/**
 * Verbatim excerpts from 5-star reviews on the Google Business Profile (GOOGLE_REVIEWS.url).
 * Keep wording as written; mark cuts with "…". Names shortened to first name + initial.
 */
const TESTIMONIALS: { quote: string; name: string; context?: string }[] = [
    {
        quote:
            'Dave developed two websites for clients of mine, both delivered to a high professional standard. The first was an e-commerce platform for a watch retailer… He was consistently professional, communicative, and delivered on time.',
        name: 'Oyewole O.',
        context: 'Referred two client builds',
    },
    {
        quote:
            'Amazing web developer. Very talented… Was able to accomplish every task I gave him and deliver a final product that was highly polished. Everyone who visited my website has nothing but good things to say.',
        name: 'G Solid Prime',
        context: 'Google Local Guide',
    },
    {
        quote:
            'A Very professional, patient website developer. He pays attention to details and grasps ideas shared quickly… I would use his services over and over again.',
        name: 'Naomi D.',
    },
    {
        quote: 'One of the best out there, very composed with attention to details. I recommend any day.',
        name: 'Hijo',
        context: 'Hijo Lux Watches',
    },
    {
        quote: 'He made my portfolio and I must admit, it was a very clean job...love it!',
        name: 'Olasubomi A.',
        context: 'Portfolio site',
    },
    {
        quote: 'He is faithful and diligent in web development… I hereby recommend him for who ever needs his service.',
        name: 'Adeyemi A.',
        context: 'Church website',
    },
];

const ProofSection: React.FC = () => {
    return (
        <div className="ui-panel scroll-mt-28 border border-slate-200/80 bg-gradient-to-br from-[#FAF9FF] via-white to-slate-50/70 p-8 md:p-12 lg:p-14">
            <span className="ui-blob -right-12 -top-12 h-52 w-52 bg-violet-400/15 blur-[90px]" aria-hidden />

            <header className="relative mb-9 max-w-2xl md:mb-11">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="ui-eyebrow mb-3"
                >
                    Credibility
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold not-italic leading-[1.08] tracking-tight text-slate-950"
                >
                    Proof you can <span className="text-violet-700">verify</span>
                </motion.h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-700 md:text-[16px]">
                    Live builds, stack discipline and shipping rhythm. Nothing here relies on adjectives alone.
                </p>
            </header>

            {TESTIMONIALS.length > 0 && (
                <div className="relative mb-8 md:mb-10">
                    <a
                        href={GOOGLE_REVIEWS.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mb-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-[14px] text-slate-700 shadow-sm transition-colors hover:border-violet-300"
                    >
                        <span className="flex items-center gap-0.5 text-amber-400" aria-hidden>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                        </span>
                        <span>
                            <span className="font-semibold text-slate-950">{GOOGLE_REVIEWS.rating}</span> from{' '}
                            {GOOGLE_REVIEWS.count} Google reviews
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-violet-700">
                            See all
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </span>
                    </a>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.figure
                                key={t.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="flex flex-col rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_32px_-22px_rgba(15,23,42,0.16)]"
                            >
                                <div className="flex items-center justify-between">
                                    <Quote className="h-5 w-5 text-violet-500" aria-hidden />
                                    <span className="flex gap-0.5 text-amber-400" role="img" aria-label="5 out of 5 stars">
                                        {Array.from({ length: 5 }).map((_, s) => (
                                            <Star key={s} className="h-3.5 w-3.5 fill-current" aria-hidden />
                                        ))}
                                    </span>
                                </div>
                                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-800 md:text-[16px]">
                                    {t.quote}
                                </blockquote>
                                <figcaption className="mt-5 border-t border-slate-100 pt-4">
                                    <p className="text-[14px] font-semibold text-slate-950">{t.name}</p>
                                    <p className="text-[13px] text-slate-600">
                                        {t.context ? `${t.context} · ` : ''}Google review
                                    </p>
                                </figcaption>
                            </motion.figure>
                        ))}
                    </div>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative mb-8 flex items-start gap-4 rounded-2xl border border-violet-200/80 bg-gradient-to-r from-violet-50/90 via-white to-indigo-50/70 px-5 py-4 shadow-[0_12px_36px_-24px_rgba(124,58,237,0.35)] md:mb-10 md:px-6 md:py-5"
            >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm">
                    <Zap className="h-4 w-4" aria-hidden />
                </span>
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-700">
                        Website Speed & Performance
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-800 md:text-[16px]">
                        Measured, not promised. PrintNest scores 96/100 for mobile performance on Lighthouse, and an
                        optimisation pass on this portfolio cut each visit from 1.4 MB to about 0.4 MB with zero layout
                        shift.
                    </p>
                </div>
            </motion.div>

            <ul className="relative grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                {PROOF.map((item, i) => (
                    <motion.li
                        key={item.line}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        style={{ ['--accent' as string]: item.accent }}
                        className="group flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 text-[15px] leading-relaxed text-slate-900 shadow-[0_10px_32px_-22px_rgba(15,23,42,0.16)] transition-colors hover:border-[var(--accent)] md:px-6 md:py-5 md:text-[16px]"
                    >
                        <span
                            className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: item.accent }}
                        >
                            <Check className="h-3 w-3" aria-hidden />
                        </span>
                        <span>{item.line}</span>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default ProofSection;
