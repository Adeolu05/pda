import React from 'react';
import { motion } from 'framer-motion';
import { Check, Quote, Zap } from 'lucide-react';

/** Credibility only, keep distinct from About (story / workflow). */
const PROOF: { line: string; accent: string }[] = [
    { line: 'Production URLs across commerce, launches and Web3, so you can verify quality in the browser.', accent: '#7C3AED' },
    { line: 'React / Next.js, WordPress, Tailwind and typed flows; disciplined deploys on Vercel.', accent: '#4F46E5' },
    { line: 'Comfortable shipping an MVP, then tightening with feedback and analytics.', accent: '#DB2777' },
    { line: 'Automation and Telegram tooling alongside full-stack delivery.', accent: '#0EA5E9' },
    { line: 'Hands-on Web3 education content (including Alephium-ecosystem work).', accent: '#16A34A' },
];

/**
 * Real client quotes only, the block stays hidden while this list is empty.
 * Ask for permission to use name + role, and keep quotes to one or two sentences.
 * Example shape:
 *   { quote: 'Orders now come straight through WhatsApp...', name: 'Jane Doe', role: 'Founder, Hijo Lux Watches', link: 'https://hijoluxwatches.com' }
 */
const TESTIMONIALS: { quote: string; name: string; role: string; link?: string }[] = [];

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
                <div className="relative mb-8 grid gap-4 md:mb-10 md:grid-cols-2 lg:grid-cols-3">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.figure
                            key={t.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className="flex flex-col rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_32px_-22px_rgba(15,23,42,0.16)]"
                        >
                            <Quote className="h-5 w-5 text-violet-500" aria-hidden />
                            <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-800 md:text-[16px]">
                                {t.quote}
                            </blockquote>
                            <figcaption className="mt-5 border-t border-slate-100 pt-4">
                                <p className="text-[14px] font-semibold text-slate-950">{t.name}</p>
                                {t.link ? (
                                    <a
                                        href={t.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] text-slate-600 underline decoration-slate-300 underline-offset-2 hover:text-violet-700"
                                    >
                                        {t.role}
                                    </a>
                                ) : (
                                    <p className="text-[13px] text-slate-600">{t.role}</p>
                                )}
                            </figcaption>
                        </motion.figure>
                    ))}
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
