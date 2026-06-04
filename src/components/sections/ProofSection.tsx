import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/** Credibility only, keep distinct from About (story / workflow). */
const PROOF: { line: string; accent: string }[] = [
    { line: 'Production URLs across commerce, launches and Web3, you verify quality in the browser.', accent: '#7C3AED' },
    { line: 'React / Next.js, Tailwind and typed flows; disciplined deploys on Vercel.', accent: '#4F46E5' },
    { line: 'Comfortable shipping an MVP, then tightening with feedback and analytics.', accent: '#DB2777' },
    { line: 'Automation and Telegram tooling alongside frontend delivery.', accent: '#0EA5E9' },
    { line: 'Hands-on Web3 education content (including Alephium-ecosystem work).', accent: '#16A34A' },
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
                    Live builds, stack discipline and shipping rhythm, nothing here relies on adjectives alone.
                </p>
            </header>

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
