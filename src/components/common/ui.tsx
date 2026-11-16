import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Subtle reveal: fade + 12px rise, once. MotionConfig in index.tsx turns it off for reduced motion. */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
    children,
    delay = 0,
    className,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: EASE, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

/** Eyebrow + title on the left, short copy on the right (2-col on desktop). */
export const SectionHeader: React.FC<{
    id?: string;
    eyebrow: string;
    title: React.ReactNode;
    children?: React.ReactNode;
}> = ({ id, eyebrow, title, children }) => (
    <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
            <span className="eyebrow">{eyebrow}</span>
            <h2 id={id} className="mt-4 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.025em] text-ink">
                {title}
            </h2>
        </div>
        {children && <div className="text-[16px] leading-relaxed text-muted md:col-span-6 md:pt-9">{children}</div>}
    </div>
);

/** Window chrome dots for framed previews. */
export const WindowBar: React.FC<{ label?: string; right?: React.ReactNode }> = ({ label, right }) => (
    <div className="flex h-9 items-center gap-1.5 border-b border-line px-3" aria-hidden>
        <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
        <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
        <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
        {label && <span className="ml-3 truncate font-mono text-[11.5px] text-faint">{label}</span>}
        {right && <span className="ml-auto">{right}</span>}
    </div>
);

export const ExternalLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...props }) => (
    <a target="_blank" rel="noopener noreferrer" {...props}>
        {children}
    </a>
);
