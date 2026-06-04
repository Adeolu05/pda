import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { RESUME_FILES } from '../../config/constants';

const PATH_ITEMS: { title: string; desc: string; accent: string }[] = [
    {
        title: 'Frontend Development',
        desc: 'Building clean, responsive interfaces with React, Next.js, Tailwind CSS and modern web tools.',
        accent: '#7C3AED',
    },
    {
        title: 'UI/UX and Product Thinking',
        desc: 'Designing websites with clarity, visual hierarchy and conversion in mind.',
        accent: '#4F46E5',
    },
    {
        title: 'Web3 and Community Products',
        desc: 'Creating content, tools and interfaces around blockchain communities and digital ecosystems.',
        accent: '#DB2777',
    },
    {
        title: 'AI-assisted Building',
        desc: 'Using AI tools like Google AI Studio, Cursor and design agents to move faster from idea to execution.',
        accent: '#0EA5E9',
    },
    {
        title: 'Client-focused Delivery',
        desc: 'Helping businesses move from offline presence to professional, credible digital platforms.',
        accent: '#16A34A',
    },
];

const Resume: React.FC = () => {
    return (
        <div
            id="resume"
            className="relative scroll-mt-28 overflow-hidden rounded-[2.25rem] border border-slate-100/90 bg-gradient-to-b from-[#FAF9FF] via-white to-white p-8 shadow-[0_1px_0_rgba(15,23,42,0.04)] md:rounded-[3rem] md:p-14 lg:p-[5.25rem]"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.55]"
                aria-hidden
                style={{
                    backgroundImage:
                        'radial-gradient(ellipse 55% 45% at 12% 18%, rgba(139,92,246,0.09), transparent 58%), radial-gradient(ellipse 40% 38% at 88% 72%, rgba(99,102,241,0.06), transparent 55%)',
                }}
            />

            <div className="pointer-events-none absolute -right-8 top-24 hidden h-px w-[min(42vw,22rem)] rotate-[25deg] bg-gradient-to-l from-transparent via-violet-200/40 to-transparent lg:block" />

            <div className="pointer-events-none absolute right-6 top-8 hidden select-none font-display text-[min(16vw,7rem)] italic leading-none text-slate-100 md:right-10 md:top-12 lg:block">
                Path.
            </div>

            <div className="relative z-10 mx-auto max-w-5xl">
                <header className="mb-12 flex flex-col gap-10 border-b border-slate-200/70 pb-12 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-12 md:pb-14">
                    <div className="max-w-2xl">
                        <span className="ui-eyebrow">Journey</span>
                        <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,4rem)] font-semibold not-italic leading-[1.06] tracking-tight text-slate-950">
                            The Path <span className="text-violet-700">Taken</span>
                        </h2>
                        <p className="mt-5 text-[15px] leading-relaxed text-slate-700 md:text-[16px] md:leading-relaxed">
                            Five chapters that describe how I think, build, and deliver, not another stack list, just the
                            through-line from craft to client outcomes.
                        </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center">
                        <motion.a
                            href={RESUME_FILES.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet-900/10 transition-colors hover:bg-violet-600"
                        >
                            <ExternalLink className="h-4 w-4" aria-hidden />
                            View resume
                        </motion.a>
                        <motion.a
                            href={RESUME_FILES.docx}
                            download="Peluola_David_Resume.docx"
                            whileHover={{ y: -2 }}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 backdrop-blur-sm transition-colors hover:border-violet-300 hover:text-violet-700"
                        >
                            <Download className="h-4 w-4" aria-hidden />
                            Word (.docx)
                        </motion.a>
                    </div>
                </header>

                <div className="space-y-0">
                    {PATH_ITEMS.map((item, i) => {
                        const isLast = i === PATH_ITEMS.length - 1;
                        return (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                style={{ ['--accent' as string]: item.accent }}
                                className="group relative flex gap-5 pb-10 last:pb-2 sm:gap-7 md:gap-9 md:pb-12"
                            >
                                {/* Rail + node */}
                                <div className="relative flex w-11 shrink-0 justify-center sm:w-12">
                                    {!isLast && (
                                        <span
                                            className="absolute left-1/2 top-12 -bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-slate-200 to-slate-200/30 md:-bottom-4"
                                            aria-hidden
                                        />
                                    )}
                                    <span
                                        className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full font-sans text-[13px] font-bold tabular-nums text-white shadow-[0_8px_20px_-8px_var(--accent)] ring-4 ring-white transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:text-sm"
                                        style={{ backgroundColor: item.accent }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="min-w-0 pt-1.5">
                                    <h3 className="font-sans text-[1.2rem] font-semibold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-[var(--accent)] sm:text-xl md:text-[1.35rem] md:leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-700 md:mt-4 md:text-[16px] md:leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                <blockquote className="relative mt-14 border-l-2 border-violet-200/90 pl-8 md:mt-20 md:pl-10">
                    <p className="max-w-3xl text-[17px] font-medium leading-relaxed text-slate-600 md:text-xl md:leading-relaxed">
                        Great interfaces feel obvious in retrospect, they remove friction so the work can speak.
                    </p>
                </blockquote>
            </div>
        </div>
    );
};

export default Resume;
