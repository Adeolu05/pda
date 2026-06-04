import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
    SiEthereum,
    SiFigma,
    SiGooglegemini,
    SiNextdotjs,
    SiReact,
    SiSanity,
    SiTailwindcss,
    SiTelegram,
    SiTypescript,
    SiVercel,
} from 'react-icons/si';

/** Matches section background, masks must align or fades read as grey bands */
const SECTION_BG = '#F6F4FC';

type ToolIconProps = { className?: string; 'aria-hidden'?: boolean | string };
type ToolEntry = { label: string; Icon: IconType | React.FC<ToolIconProps> };

const CursorMarqueeIcon: React.FC<ToolIconProps> = ({ className, ...rest }) => (
    <Code2 className={className} strokeWidth={1.75} {...rest} />
);

const MARQUEE_TOOLS: ToolEntry[] = [
    { label: 'React', Icon: SiReact },
    { label: 'Next.js', Icon: SiNextdotjs },
    { label: 'Tailwind CSS', Icon: SiTailwindcss },
    { label: 'TypeScript', Icon: SiTypescript },
    { label: 'Figma', Icon: SiFigma },
    { label: 'Sanity', Icon: SiSanity },
    { label: 'Vercel', Icon: SiVercel },
    { label: 'Cursor', Icon: CursorMarqueeIcon },
    { label: 'Google AI Studio', Icon: SiGooglegemini },
    { label: 'Telegram Bots', Icon: SiTelegram },
    { label: 'Web3', Icon: SiEthereum },
];

const fadeLeftStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, ${SECTION_BG} 0%, rgba(246,244,252,0.98) 28%, rgba(246,244,252,0.65) 62%, rgba(246,244,252,0.08) 88%, transparent 100%)`,
};

const fadeRightStyle: React.CSSProperties = {
    background: `linear-gradient(270deg, ${SECTION_BG} 0%, rgba(246,244,252,0.98) 28%, rgba(246,244,252,0.65) 62%, rgba(246,244,252,0.08) 88%, transparent 100%)`,
};

function LogoCapsule({ label, Icon }: ToolEntry) {
    return (
        <div
            className="
                group/item inline-flex shrink-0 items-center gap-3.5 rounded-full border border-slate-200/85 bg-white/[0.72]
                px-[1.35rem] py-[0.95rem] shadow-[0_2px_8px_rgba(15,23,42,0.05),0_12px_32px_-24px_rgba(124,58,237,0.12)] backdrop-blur-[11px]
                transition-[border-color,box-shadow,background-color] duration-300 ease-out
                hover:border-violet-300/50 hover:bg-white/[0.92] hover:shadow-[0_14px_40px_-22px_rgba(124,58,237,0.18)]
                md:gap-4 md:px-7 md:py-[1.05rem]
            "
        >
            <Icon
                className="
                    h-[19px] w-[19px] shrink-0 text-slate-600 opacity-90 grayscale-[0.65] contrast-[1.02]
                    transition-[color,opacity,filter] duration-300 ease-out
                    group-hover/item:text-violet-700 group-hover/item:opacity-100 group-hover/item:grayscale-[0.15]
                    md:h-[22px] md:w-[22px] lg:h-6 lg:w-6
                "
                aria-hidden
            />
            <span className="whitespace-nowrap font-sans text-[14px] font-medium tracking-[-0.012em] text-slate-900 md:text-[14.5px]">
                {label}
            </span>
        </div>
    );
}

function TechMarquee({ tools }: { tools: ToolEntry[] }) {
    const reduceMotion = useReducedMotion();
    const trackRef = useRef<HTMLDivElement>(null);
    const [loopWidth, setLoopWidth] = useState(0);
    const stripTools = [...tools, ...tools];

    useEffect(() => {
        const measure = () => {
            if (!trackRef.current) return;
            setLoopWidth(trackRef.current.scrollWidth / 2);
        };

        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [tools]);

    if (reduceMotion) {
        return (
            <div className="flex flex-wrap items-center justify-center gap-3 px-2 md:gap-4">
                {tools.map((tool) => (
                    <LogoCapsule key={tool.label} {...tool} />
                ))}
            </div>
        );
    }

    if (loopWidth > 0) {
        const duration = Math.max(loopWidth / 42, 28);

        return (
            <motion.div
                ref={trackRef}
                className="tech-marquee-track flex items-center gap-7 md:gap-9 lg:gap-11"
                animate={{ x: [0, -loopWidth] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration,
                        ease: 'linear',
                    },
                }}
                style={{ animation: 'none', WebkitAnimation: 'none' }}
            >
                {stripTools.map((tool, index) => (
                    <LogoCapsule key={`${tool.label}-${index}`} {...tool} />
                ))}
            </motion.div>
        );
    }

    return (
        <div
            ref={trackRef}
            className="tech-marquee-track flex items-center gap-7 md:gap-9 lg:gap-11"
            style={{ animation: 'none', WebkitAnimation: 'none' }}
        >
            {stripTools.map((tool, index) => (
                <LogoCapsule key={`${tool.label}-${index}`} {...tool} />
            ))}
        </div>
    );
}

const TechStrip: React.FC = () => {
    return (
        <section
            className="relative overflow-x-hidden border-y border-slate-200/70 bg-[#F6F4FC]"
            aria-labelledby="tech-strip-heading"
        >
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                    opacity: 0.62,
                    backgroundImage:
                        'radial-gradient(ellipse 56% 62% at 10% 42%, rgba(139,92,246,0.055), transparent 58%), radial-gradient(ellipse 50% 52% at 92% 56%, rgba(99,102,241,0.05), transparent 56%), radial-gradient(ellipse 70% 55% at 78% 88%, rgba(139,92,246,0.04), transparent 55%)',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 py-16 pb-[max(3.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-[4.25rem] md:py-[5.25rem] lg:px-12 lg:py-[5.75rem]">
                <div className="flex flex-col gap-14 lg:grid lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.52fr)] lg:items-center lg:gap-x-[clamp(2rem,5vw,4.5rem)] xl:gap-x-20">
                    <header className="max-w-[26rem] lg:max-w-[28rem] lg:pr-4">
                        <span className="ui-eyebrow">Tooling</span>
                        <h2
                            id="tech-strip-heading"
                            className="mt-5 font-display text-[clamp(1.95rem,4.2vw,2.85rem)] font-semibold not-italic leading-[1.12] tracking-tight text-slate-950 text-balance md:leading-[1.08]"
                        >
                            A focused stack for dependable launches.
                        </h2>
                        <p className="mt-6 max-w-[38ch] font-sans text-[15px] leading-[1.68] text-slate-800 md:text-[16px] md:leading-[1.72]">
                            React / Next.js, Tailwind, typed components, CMS when content moves, Vercel when it ships, the
                            same toolkit for marketing sites, dashboards and Web3 surfaces.
                        </p>
                    </header>

                    <div className="relative min-w-0 lg:-mr-4 xl:-mr-6 2xl:-mr-8">
                        <div className="relative rounded-[1.6rem] md:rounded-[1.85rem] lg:rounded-[2rem]">
                            <div
                                className="pointer-events-none absolute inset-[-10%_-8%_-14%_-8%] rounded-[inherit] bg-[radial-gradient(ellipse_74%_62%_at_50%_48%,rgba(139,92,246,0.11),rgba(139,92,246,0.04)_45%,transparent_72%)] opacity-[0.95]"
                                aria-hidden
                            />
                            <div
                                className="tech-marquee-hover-wrap relative overflow-hidden rounded-[inherit] border border-slate-200/55 bg-white/[0.88] py-8 shadow-[0_20px_52px_-34px_rgba(124,58,237,0.14),0_12px_36px_-28px_rgba(15,23,42,0.1),inset_0_1px_0_0_rgba(255,255,255,0.75)] md:bg-white/[0.58] md:py-10 md:backdrop-blur-[14px] lg:py-[2.65rem]"
                            >
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[5rem] sm:w-24 md:w-36 lg:w-[10.5rem] xl:w-[12rem]"
                                    style={fadeLeftStyle}
                                    aria-hidden
                                />
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[5rem] sm:w-24 md:w-36 lg:w-[10.5rem] xl:w-[12rem]"
                                    style={fadeRightStyle}
                                    aria-hidden
                                />

                                <div className="relative px-4 md:px-7 lg:px-10">
                                    <TechMarquee tools={MARQUEE_TOOLS} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStrip;
