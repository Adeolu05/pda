import React from 'react';
import { Blocks, ShoppingBag, MousePointerClick, ShieldCheck } from 'lucide-react';
import { PROCESS, SERVICES } from '../../config/content';
import { Reveal, SectionHeader } from '../common/ui';

const ICONS = [Blocks, ShoppingBag, MousePointerClick, ShieldCheck];

const Services: React.FC = () => (
    <section id="services" aria-labelledby="services-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site">
            <Reveal>
                <SectionHeader id="services-title" eyebrow="Services" title="What I can build for you.">
                    One developer from design to deploy. No hand-offs, no agency layers, and you talk to the person writing the code.
                </SectionHeader>
            </Reveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES.map((s, i) => {
                    const Icon = ICONS[i];
                    return (
                        <Reveal key={s.title} delay={i * 0.06} className="flex">
                            <div className="card card-hover flex w-full flex-col p-6">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-accent">
                                    <Icon className="h-5 w-5" aria-hidden />
                                </span>
                                <h3 className="mt-5 text-[16px] font-medium text-ink">{s.title}</h3>
                                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
                                <p className="mt-5 font-mono text-[11.5px] text-faint">{s.stack}</p>
                            </div>
                        </Reveal>
                    );
                })}
            </div>

            <div className="mt-20">
                <h3 className="text-[18px] font-medium text-ink">How a project runs</h3>
                <ol className="mt-6 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {PROCESS.map((p) => (
                        <li key={p.step} className="bg-bg p-6">
                            <span className="font-mono text-[12px] text-accent">{p.step}</span>
                            <p className="mt-3 text-[16px] font-medium text-ink">{p.title}</p>
                            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    </section>
);

export default Services;
