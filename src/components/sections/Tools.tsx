import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { CANISHIELD_PREVIEW, TOOLS, type Tool } from '../../config/content';
import { ExternalLink, Reveal, SectionHeader, WindowBar } from '../common/ui';

const toneClass = { warn: 'text-warn', danger: 'text-danger' } as const;

/** Mini Can I Shield board, built from results verified on the live site. */
const CanIShieldMini: React.FC = () => (
    <div className="flex aspect-[16/10] flex-col justify-center bg-raised/40 px-4 py-3">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">Send shielded ZEC to…</p>
        <ul className="mt-2 divide-y divide-line rounded-md border border-line bg-surface">
            {CANISHIELD_PREVIEW.map((row) => (
                <li key={row.name} className="flex items-center justify-between gap-3 px-3 py-[0.4rem] text-[12px]">
                    <span className="text-ink">{row.name}</span>
                    <span className={`truncate font-mono text-[10.5px] ${toneClass[row.tone]}`}>{row.state}</span>
                </li>
            ))}
        </ul>
    </div>
);

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => (
    <article aria-labelledby={`tool-${tool.slug}`} className="frame flex h-full flex-col">
        <WindowBar label={`~/${tool.slug}`} />
        {tool.shot ? (
            <img
                src={tool.shot.src}
                srcSet={tool.shot.srcSet ? `${tool.shot.src.replace('.webp', '-960.webp')} 960w, ${tool.shot.src} 1600w` : undefined}
                sizes={tool.shot.srcSet ? '(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw' : undefined}
                alt={tool.shot.alt}
                width={tool.shot.width ?? 1600}
                height={tool.shot.height ?? 1000}
                loading="lazy"
                decoding="async"
                className="hidden aspect-[16/10] w-full border-b border-line object-cover object-top sm:block"
            />
        ) : (
            <div className="hidden border-b border-line sm:block">
                <CanIShieldMini />
            </div>
        )}
        <div className="flex flex-1 flex-col p-5">
            <span className="self-start font-mono text-[10.5px] uppercase tracking-[0.12em] text-focus">{tool.badge}</span>
            <h3 id={`tool-${tool.slug}`} className="mt-2 text-[18px] font-medium tracking-[-0.015em] text-ink">
                {tool.name}
            </h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{tool.summary}</p>
            <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-[13.5px]">
                <ExternalLink href={tool.live} className="inline-flex items-center gap-1 font-medium text-ink hover:text-accent">
                    Open <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    <span className="sr-only">{tool.name} (opens in a new tab)</span>
                </ExternalLink>
                <ExternalLink href={tool.repo} className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
                    <Github className="h-3.5 w-3.5" aria-hidden /> Source
                    <span className="sr-only">code for {tool.name} (opens in a new tab)</span>
                </ExternalLink>
            </div>
        </div>
    </article>
);

const Tools: React.FC = () => (
    <section id="tools" aria-labelledby="tools-title" className="border-t border-line py-16 sm:py-20 md:py-28">
        <div className="container-site">
            <Reveal>
                <SectionHeader id="tools-title" eyebrow="Open source" title="I also build privacy and security tools for crypto.">
                    Built in public for Zcash, NEAR and Parano1d. Live, open source, and every result shows its proof.
                </SectionHeader>
            </Reveal>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
                {TOOLS.map((tool, i) => (
                    <Reveal key={tool.slug} delay={i * 0.05} className="h-full">
                        <ToolCard tool={tool} />
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default Tools;
