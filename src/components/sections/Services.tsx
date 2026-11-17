import React from 'react';
import { ArrowRight, Blocks, Check, MousePointerClick, ShieldCheck, ShoppingBag } from 'lucide-react';
import { PROCESS, SERVICES } from '../../config/content';
import { Reveal, SectionHeader } from '../common/ui';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
    ecommerce: ShoppingBag,
    webapps: Blocks,
    landing: MousePointerClick,
    crypto: ShieldCheck,
};

const IconTile: React.FC<{ k: string }> = ({ k }) => {
    const Icon = ICONS[k] ?? Blocks;
    return (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-accent">
            <Icon className="h-5 w-5" aria-hidden />
        </span>
    );
};

const Services: React.FC = () => {
    const [main, ...rest] = SERVICES;

    return (
        <section id="services" aria-labelledby="services-title" className="border-t border-line py-16 sm:py-20 md:py-28">
            <div className="container-site">
                <Reveal>
                    <SectionHeader id="services-title" eyebrow="Services" title="What I can build for you.">
                        One developer from design to launch. You talk to the person writing the code.
                    </SectionHeader>
                </Reveal>

                {/* E-commerce leads the services */}
                <Reveal className="mt-14">
                    <div className="card relative overflow-hidden p-6 sm:p-8">
                        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
                        <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
                            <div className="lg:col-span-5">
                                <div className="flex items-center gap-3">
                                    <IconTile k={main.key} />
                                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[12px] text-focus">
                                        Main focus
                                    </span>
                                </div>
                                <h3 className="mt-5 text-[24px] font-medium tracking-[-0.02em] text-ink">{main.title}</h3>
                                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{main.body}</p>
                                <p className="mt-5 font-mono text-[11.5px] text-faint">{main.stack}</p>
                                <a href="#contact" className="btn-primary mt-7">
                                    Start a store project <ArrowRight className="h-4 w-4" aria-hidden />
                                </a>
                            </div>
                            <div className="lg:col-span-7">
                                <p className="text-[13px] font-medium text-ink">What you get</p>
                                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {main.includes?.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink">
                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                    {rest.map((s, i) => (
                        <Reveal key={s.title} delay={i * 0.06} className="flex">
                            <div className="card card-hover flex w-full items-start gap-4 p-5 md:flex-col md:gap-0 md:p-6">
                                <IconTile k={s.key} />
                                <div className="md:mt-5">
                                    <h3 className="text-[16px] font-medium text-ink">{s.title}</h3>
                                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted md:mt-2">{s.body}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-16">
                    <h3 className="text-[18px] font-medium text-ink">How a project runs</h3>
                    <ol className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-4">
                        {PROCESS.map((p) => (
                            <li key={p.step} className="bg-bg p-5 sm:p-6">
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
};

export default Services;
