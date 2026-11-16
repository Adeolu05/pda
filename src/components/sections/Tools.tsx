import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { CANISHIELD_PREVIEW, TOOLS, type Tool } from '../../config/content';
import { ExternalLink, Reveal, SectionHeader, WindowBar } from '../common/ui';

const toneClass = { warn: 'text-warn', danger: 'text-danger' } as const;

/** Text-only preview of the Can I Shield board, built from results verified on the live site. */
const CanIShieldPreview: React.FC = () => (
    <div className="frame">
        <WindowBar label="canishield.vercel.app" />
        <div className="p-5 sm:p-6">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">Ironwood readiness</p>
            <p className="mt-2 text-[22px] font-medium tracking-tight text-ink">Can I send shielded ZEC to…</p>
            <ul className="mt-5 divide-y divide-line rounded-lg border border-line">
                {CANISHIELD_PREVIEW.map((row) => (
                    <li key={row.name} className="flex items-center justify-between gap-4 px-4 py-3 text-[14px]">
                        <span className="text-ink">{row.name}</span>
                        <span className={`font-mono text-[12px] ${toneClass[row.tone]}`}>{row.state}</span>
                    </li>
                ))}
            </ul>
            <p className="mt-4 font-mono text-[11.5px] text-faint">Each result links to its proof: txid, viewing key or screenshot.</p>
        </div>
    </div>
);

const ToolRow: React.FC<{ tool: Tool; flip: boolean }> = ({ tool, flip }) => (
    <article aria-labelledby={`tool-${tool.slug}`} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
        <Reveal className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
            {tool.shot ? (
                <div className="frame">
                    <WindowBar label={new URL(tool.live).host} />
                    <img
                        src={tool.shot.src}
                        alt={tool.shot.alt}
                        width={1600}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                        className="block w-full"
                    />
                </div>
            ) : (
                <CanIShieldPreview />
            )}
        </Reveal>

        <Reveal delay={0.06} className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
            <span className="pill !text-focus">{tool.badge}</span>
            <h3 id={`tool-${tool.slug}`} className="mt-4 text-[26px] font-medium tracking-[-0.02em] text-ink">
                {tool.name}
            </h3>
            <p className="mt-1 text-[15px] text-faint">{tool.tagline}</p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">{tool.summary}</p>
            <ul className="mt-5 space-y-2">
                {tool.facts.map((f) => (
                    <li key={f} className="flex gap-3 text-[14.5px] text-ink">
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        {f}
                    </li>
                ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
                {tool.stack.map((s) => (
                    <span key={s} className="pill">
                        {s}
                    </span>
                ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
                <ExternalLink href={tool.live} className="btn-primary">
                    Open {tool.name} <ArrowUpRight className="h-4 w-4" aria-hidden />
                </ExternalLink>
                <ExternalLink href={tool.repo} className="btn-secondary">
                    <Github className="h-4 w-4" aria-hidden /> Source
                </ExternalLink>
            </div>
        </Reveal>
    </article>
);

const Tools: React.FC = () => (
    <section id="tools" aria-labelledby="tools-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site">
            <Reveal>
                <SectionHeader id="tools-title" eyebrow="Tools I built" title="Open-source privacy and security tools for crypto.">
                    Built in public for the Zcash and NEAR ecosystems. Each one is live, open source and shows its evidence, so you can
                    check the work instead of taking my word for it.
                </SectionHeader>
            </Reveal>
            <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
                {TOOLS.map((tool, i) => (
                    <ToolRow key={tool.slug} tool={tool} flip={i % 2 === 1} />
                ))}
            </div>
        </div>
    </section>
);

export default Tools;
