import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WindowBar } from '../common/ui';
import { FEATURED, MORE_BUILDS, TOOLS } from '../../config/content';
import { GOOGLE_REVIEWS } from '../../config/constants';

const EASE = [0.16, 1, 0.3, 1] as const;

const Row: React.FC<{ k: string; v: React.ReactNode }> = ({ k, v }) => (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3 sm:grid-cols-[8rem_1fr]">
        <span className="text-faint">{k}</span>
        <span className="text-ink">{v}</span>
    </div>
);

const Hero: React.FC = () => {
    const sites = FEATURED.length + MORE_BUILDS.length;

    return (
        <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-32 sm:pt-40 md:pb-28">
            <div className="container-site flex flex-col items-center text-center">
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface px-3 py-1.5 font-mono text-[12px] text-muted"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                    Available for new projects
                </motion.p>

                <motion.h1
                    id="hero-title"
                    initial={{ y: 12 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
                    className="mt-7 max-w-[17ch] bg-gradient-to-b from-white to-white/65 bg-clip-text text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.035em] text-transparent"
                >
                    I build web apps that sell, and privacy tools for crypto.
                </motion.h1>

                <motion.p
                    initial={{ y: 12 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
                    className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-muted"
                >
                    I&apos;m David Peluola, a full-stack developer in Nigeria. I ship fast, maintainable sites for businesses, and
                    open-source tools for the Zcash and NEAR ecosystems.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
                    className="mt-9 flex flex-wrap items-center justify-center gap-3"
                >
                    <a href="#contact" className="btn-primary">
                        Start a project <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                    <a href="#tools" className="btn-secondary">
                        See the tools I built
                    </a>
                </motion.div>
            </div>

            <div className="container-site relative mt-16 md:mt-20 [perspective:1600px]">
                <div aria-hidden className="glow glow-drift h-[60%] w-[70%]" />
                <motion.div
                    initial={{ rotateX: 6, y: 40, opacity: 0 }}
                    animate={{ rotateX: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                    className="frame relative mx-auto max-w-3xl text-left"
                >
                    <WindowBar label="~/dpeluola" />
                    <div className="space-y-5 p-5 font-mono text-[12.5px] leading-[1.75] sm:p-7 sm:text-[13.5px]">
                        <div>
                            <p className="text-muted">
                                <span className="text-accent">$</span> whoami
                            </p>
                            <div className="mt-1.5 space-y-0.5">
                                <Row k="name" v="David Peluola" />
                                <Row k="role" v="Full-stack developer" />
                                <Row k="based" v="Nigeria · remote · WAT (UTC+1)" />
                                <Row k="stack" v="React · Next.js · TypeScript · Node · Postgres · Rust" />
                            </div>
                        </div>
                        <div>
                            <p className="text-muted">
                                <span className="text-accent">$</span> ls ./shipped
                            </p>
                            <div className="mt-1.5 space-y-0.5">
                                {TOOLS.map((t) => (
                                    <Row
                                        key={t.slug}
                                        k={t.slug}
                                        v={
                                            <span>
                                                <span className="text-success">✓</span> {t.badge}
                                            </span>
                                        }
                                    />
                                ))}
                                <Row
                                    k="client-work"
                                    v={
                                        <span>
                                            <span className="text-success">✓</span> {sites} sites and apps
                                        </span>
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-muted">
                                <span className="text-accent">$</span> reviews
                            </p>
                            <p className="mt-1.5 text-ink">
                                <span className="text-warn">★ {GOOGLE_REVIEWS.rating}</span> from {GOOGLE_REVIEWS.count} Google reviews
                                <span className="caret ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-ink/80" aria-hidden />
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
