import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProcessCarousel } from '../../hooks/useProcessCarousel';

const NAV_BTN =
    'inline-flex min-h-[2.75rem] min-w-[2.75rem] shrink-0 items-center justify-center rounded-full border border-slate-300/90 bg-white text-slate-800 shadow-sm transition-[transform,opacity,box-shadow,border-color] hover:border-violet-400 hover:shadow-md active:scale-95 disabled:pointer-events-none disabled:opacity-30 sm:min-h-12 sm:min-w-12';

type StepVisual = 'discover' | 'design' | 'build' | 'launch';

type ProcessStep = {
    title: string;
    body: string;
    rotate: number;
    visual: StepVisual;
    surface: string;
    accent: string;
};

const STEPS: ProcessStep[] = [
    {
        title: 'Discover',
        body: 'I understand the brand, audience, goals and the exact action the website needs users to take.',
        rotate: -2.8,
        visual: 'discover',
        surface: 'from-violet-100 via-violet-50 to-indigo-100/80',
        accent: '#7C3AED',
    },
    {
        title: 'Design Direction',
        body: 'I create a clean visual direction with strong hierarchy, layout, copy and user flow.',
        rotate: 2.4,
        visual: 'design',
        surface: 'from-fuchsia-100/90 via-violet-50 to-sky-100/70',
        accent: '#A855F7',
    },
    {
        title: 'Build',
        body: 'I develop the site with modern frontend tools, responsive layouts, performance and maintainability.',
        rotate: -2.2,
        visual: 'build',
        surface: 'from-indigo-100/80 via-slate-50 to-violet-100/60',
        accent: '#6366F1',
    },
    {
        title: 'Launch',
        body: 'I deploy, test and refine so the site is ready for customers, investors or communities.',
        rotate: 3.1,
        visual: 'launch',
        surface: 'from-emerald-50 via-violet-50 to-violet-100/90',
        accent: '#8B5CF6',
    },
];

function StepPreview({ visual, accent }: { visual: StepVisual; accent: string }) {
    if (visual === 'discover') {
        return (
            <div className="relative mx-auto h-full w-[78%] pt-6">
                <div className="space-y-2.5 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-sm backdrop-blur-sm">
                    <div className="h-2 w-2/3 rounded-full bg-slate-200/90" />
                    <div className="h-16 rounded-xl bg-gradient-to-br from-violet-200/50 to-indigo-100/40" />
                    <div className="flex gap-2">
                        <div className="h-8 flex-1 rounded-lg bg-slate-100/90" />
                        <div className="h-8 flex-1 rounded-lg bg-slate-100/90" />
                    </div>
                </div>
                <div
                    className="absolute -right-1 top-4 h-10 w-10 rounded-2xl border border-white/50 shadow-md"
                    style={{ backgroundColor: `${accent}22` }}
                    aria-hidden
                />
            </div>
        );
    }

    if (visual === 'design') {
        return (
            <div className="relative mx-auto flex h-full w-[82%] items-center justify-center gap-3 pt-4">
                <div className="flex flex-col gap-2">
                    <span className="h-9 w-9 rounded-full shadow-sm" style={{ backgroundColor: accent }} />
                    <span className="h-9 w-9 rounded-full bg-indigo-200/80 shadow-sm" />
                    <span className="h-9 w-9 rounded-full bg-fuchsia-200/70 shadow-sm" />
                </div>
                <div className="flex-1 space-y-2 rounded-2xl border border-white/60 bg-white/75 p-3 shadow-sm">
                    <div className="h-2.5 w-full rounded-full bg-slate-900/10" />
                    <div className="h-2 w-4/5 rounded-full bg-slate-900/[0.06]" />
                    <div className="h-2 w-3/5 rounded-full bg-slate-900/[0.06]" />
                    <div className="mt-3 h-14 rounded-xl bg-gradient-to-r from-violet-200/40 to-fuchsia-100/50" />
                </div>
            </div>
        );
    }

    if (visual === 'build') {
        return (
            <div className="relative mx-auto h-full w-[84%] pt-5">
                <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-slate-950 shadow-lg">
                    <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-rose-400/90" />
                        <span className="h-2 w-2 rounded-full bg-amber-400/90" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
                    </div>
                    <div className="space-y-2 p-3 font-mono text-[9px] leading-relaxed text-violet-200/90 md:text-[10px]">
                        <p>
                            <span className="text-violet-400">const</span> site ={' '}
                            <span className="text-emerald-300">launchReady</span>();
                        </p>
                        <p className="text-slate-500">// responsive · typed · fast</p>
                        <p>
                            <span className="text-violet-400">return</span> polish(ui);
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative mx-auto flex h-full w-[80%] flex-col items-center justify-center pt-4">
            <div
                className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg"
                style={{ color: accent }}
            >
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <div className="mt-4 flex gap-2" aria-hidden>
                {[0, 1, 2, 3, 4].map((n) => (
                    <span
                        key={n}
                        className="h-2 w-2 rounded-full"
                        style={{
                            backgroundColor: n % 2 === 0 ? accent : '#C4B5FD',
                            opacity: 0.35 + n * 0.12,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

const ProcessSection: React.FC = () => {
    const reduceMotion = useReducedMotion();
    const {
        scrollRef,
        canPrev,
        canNext,
        isOverflowing,
        scrollByDirection,
        onCarouselKeyDown,
        onPointerDown,
        onPointerMove,
        onPointerUp,
    } = useProcessCarousel(STEPS.length, reduceMotion);

    return (
        <div id="process" className="scroll-mt-28">
            <section
                className="relative overflow-hidden rounded-[2rem] bg-[#F4F2FA] px-4 py-10 sm:px-6 sm:py-12 md:rounded-[2.75rem] md:px-10 md:py-14 lg:px-12 lg:py-16"
                aria-labelledby="process-heading"
            >
                {/* Playful organic blobs */}
                <div
                    className="pointer-events-none absolute -right-[12%] -top-[18%] h-[min(52vw,22rem)] w-[min(52vw,22rem)] rounded-[42%_58%_70%_30%_/_45%_55%_45%_55%] bg-lime-300/35 blur-[2px] md:-right-[6%] md:h-80 md:w-80"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute -bottom-[22%] -left-[14%] h-[min(48vw,20rem)] w-[min(48vw,20rem)] rounded-[58%_42%_35%_65%_/_52%_48%_62%_38%] bg-sky-300/30 blur-[1px] md:-left-[5%] md:h-72 md:w-72"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute left-[38%] top-[42%] h-40 w-56 rounded-full bg-violet-400/10 blur-3xl"
                    aria-hidden
                />

                <header className="relative mx-auto mb-8 max-w-3xl text-center md:mb-12">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="ui-eyebrow ui-eyebrow-center mb-3 justify-center"
                    >
                        Process
                    </motion.span>
                    <motion.h2
                        id="process-heading"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-[clamp(2rem,5.5vw,3.35rem)] font-semibold not-italic leading-[1.08] tracking-tight text-slate-950 text-balance"
                    >
                        A calm process from brief to{' '}
                        <span className="text-violet-600">launch</span>
                    </motion.h2>
                    <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-slate-800 md:text-[16px]">
                        Fixed phases, visible checkpoints, no mystery backlog or surprise scope.
                    </p>
                </header>

                <div className="relative">
                    {isOverflowing && (
                        <>
                            <button
                                type="button"
                                onClick={() => scrollByDirection(-1)}
                                disabled={!canPrev}
                                aria-label="Previous step"
                                className={`${NAV_BTN} absolute left-1 top-[42%] z-20 hidden -translate-y-1/2 md:left-3 md:flex lg:left-5`}
                            >
                                <ChevronLeft className="h-5 w-5" aria-hidden />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollByDirection(1)}
                                disabled={!canNext}
                                aria-label="Next step"
                                className={`${NAV_BTN} absolute right-1 top-[42%] z-20 hidden -translate-y-1/2 md:right-3 md:flex lg:right-5`}
                            >
                                <ChevronRight className="h-5 w-5" aria-hidden />
                            </button>
                        </>
                    )}

                    <div
                        id="process-carousel-track"
                        ref={scrollRef}
                        tabIndex={0}
                        onKeyDown={onCarouselKeyDown}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        className={`process-carousel flex gap-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-6 pt-2 snap-x snap-mandatory no-scrollbar sm:gap-6 md:gap-7 ${
                            isOverflowing ? 'cursor-grab touch-pan-x active:cursor-grabbing' : 'cursor-default justify-center'
                        }`}
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Project process steps"
                    >
                        <div className="process-carousel-gutter shrink-0" aria-hidden />
                        {STEPS.map((step, i) => (
                            <motion.article
                                key={step.title}
                                data-process-index={i}
                                id={`process-slide-${i}`}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-20px' }}
                                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : { rotate: 0, y: -10, transition: { type: 'spring', stiffness: 320, damping: 22 } }
                                }
                                style={{ rotate: reduceMotion ? 0 : step.rotate }}
                                className="process-carousel-slide w-[min(88vw,19rem)] shrink-0 snap-center sm:w-[17.5rem] md:w-[18.5rem] lg:w-[19.5rem]"
                                aria-roledescription="slide"
                                aria-label={`${i + 1} of ${STEPS.length}: ${step.title}`}
                            >
                                <div className="flex h-full min-h-[22.5rem] flex-col overflow-hidden rounded-[1.85rem] bg-white shadow-[0_22px_56px_-18px_rgba(15,23,42,0.18),0_8px_24px_-12px_rgba(124,58,237,0.12)] ring-1 ring-black/[0.04] sm:min-h-[24rem] md:rounded-[2rem]">
                                    <div
                                        className={`relative h-[9.5rem] shrink-0 overflow-hidden bg-gradient-to-br sm:h-[10.5rem] ${step.surface}`}
                                    >
                                        <div
                                            className="pointer-events-none absolute inset-0 opacity-40"
                                            style={{
                                                backgroundImage:
                                                    'radial-gradient(circle at 30% 20%, white 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.5) 0%, transparent 40%)',
                                            }}
                                            aria-hidden
                                        />
                                        <StepPreview visual={step.visual} accent={step.accent} />
                                    </div>

                                    <div className="flex flex-1 flex-col p-6 md:p-7">
                                        <span className="font-sans text-[12px] font-bold tabular-nums tracking-wide text-violet-600">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="mt-3 font-sans text-xl font-semibold leading-snug tracking-tight text-slate-950">
                                            {step.title}
                                        </h3>
                                        <p className="mt-3 flex-1 text-[16px] leading-relaxed text-slate-800 md:text-[17px] md:leading-[1.65]">
                                            {step.body}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                        <div className="process-carousel-gutter shrink-0" aria-hidden />
                    </div>

                    {/* Fade edges, desktop hint at overflow */}
                    <div
                        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-[#F4F2FA] to-transparent md:block lg:w-24"
                        aria-hidden
                    />
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-[#F4F2FA] to-transparent md:block lg:w-24"
                        aria-hidden
                    />
                </div>
            </section>
        </div>
    );
};

export default ProcessSection;
