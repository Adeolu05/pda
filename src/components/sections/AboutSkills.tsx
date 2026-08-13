import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { Check } from 'lucide-react';
import { PROFILE_IMAGE } from '../../config/constants';

/** How I work, kept separate from Proof (live credibility). */
const WORK_STYLE: { label: string; accent: string }[] = [
    { label: 'Design-led layouts and typography', accent: '#7C3AED' },
    { label: 'React / Next.js and full-stack implementations', accent: '#4F46E5' },
    { label: 'WordPress, WooCommerce and CMS your team can run', accent: '#DB2777' },
    { label: 'Ship, observe, refine, no mystery backlog', accent: '#0EA5E9' },
];

const AboutSkills: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [imageError, setImageError] = useState(false);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const imageScaleMv = useTransform(scrollYProgress, [0, 1], [1.35, 1.55]);
    const imageYMv = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
    const blurOrbYMv = useTransform(scrollYProgress, [0, 1], [0, 48]);

    const imageScale: number | MotionValue<number> = reduceMotion ? 1.4 : imageScaleMv;
    const imageY: string | MotionValue<string> = reduceMotion ? '0%' : imageYMv;
    const blurOrbY: number | MotionValue<number> = reduceMotion ? 0 : blurOrbYMv;

    return (
        <div id="about" className="scroll-mt-28" ref={containerRef}>
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-24 lg:gap-x-20">
                <div className="lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 overflow-hidden rounded-[2.2rem] border border-white/40 bg-white/60 p-2 shadow-2xl backdrop-blur-2xl md:rounded-[3rem] md:p-4">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-slate-950 md:rounded-[2.4rem]">
                                {!imageError ? (
                                    <motion.img
                                        style={{ scale: imageScale, y: imageY }}
                                        src={PROFILE_IMAGE}
                                        onError={() => setImageError(true)}
                                        className="h-full w-full object-cover object-center brightness-[0.55] contrast-[1.2] transform-gpu"
                                        alt="Peluola David Adeoluwa"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-slate-900">
                                        <span className="font-display text-6xl italic text-white/20">PDA</span>
                                    </div>
                                )}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40" />
                                <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-6 pt-16 md:px-8 md:pb-8 md:pt-20">
                                    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md md:px-5 md:py-3.5">
                                        <p className="font-sans text-[14px] font-medium leading-snug text-white/95 md:text-[15px]">
                                            Peluola David Adeoluwa · Web Engineer · Remote
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.div
                            style={{ y: blurOrbY }}
                            className="absolute -right-8 -top-8 -z-10 h-52 w-52 rounded-full bg-violet-500/[0.13] blur-[90px]"
                            aria-hidden
                        />
                        <span
                            className="ui-blob -z-10 -bottom-10 -left-10 h-44 w-44 bg-fuchsia-400/20 blur-[70px]"
                            aria-hidden
                        />
                    </motion.div>
                </div>

                <div className="lg:col-span-7">
                    <header className="mb-12 max-w-2xl lg:mb-14">
                        <span className="ui-eyebrow mb-4">About</span>
                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-[clamp(2.05rem,4.8vw,3.25rem)] font-semibold not-italic leading-[1.06] tracking-tight text-slate-950"
                        >
                            Calm interfaces,{' '}
                            <span className="text-violet-700">clear logic</span>
                        </motion.h2>
                    </header>

                    <div className="max-w-2xl space-y-6 text-[15px] leading-[1.72] text-slate-700 md:text-[16px] md:leading-[1.75]">
                        <p>
                            I&apos;m <span className="font-semibold text-slate-900">Peluola David Adeoluwa</span>. As a
                            dependable Web Engineer, I translate complex design concepts into fluid code and robust,
                            production-ready infrastructure.
                        </p>
                        <p>
                            I eliminate sluggish agency overhead by providing direct, high-craft technical
                            collaboration, ensuring your digital launch is fast, secure, and visually flawless, from
                            server architecture down to UI polish.
                        </p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        {WORK_STYLE.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                style={{ ['--accent' as string]: item.accent }}
                                className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-4 text-[15px] font-medium leading-snug text-slate-800 shadow-sm transition-colors hover:border-[var(--accent)]"
                            >
                                <span
                                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                                    style={{ backgroundColor: item.accent }}
                                >
                                    <Check className="h-3 w-3" aria-hidden />
                                </span>
                                <span>{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSkills;
