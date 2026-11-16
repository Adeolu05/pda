import React from 'react';
import { FileText } from 'lucide-react';
import { PROFILE_IMAGE, RESUME_FILES } from '../../config/constants';
import { STACK } from '../../config/content';
import { Reveal } from '../common/ui';

const About: React.FC = () => (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-14">
            <Reveal className="md:col-span-5">
                <div className="frame mx-auto max-w-sm md:mx-0">
                    <img
                        src={PROFILE_IMAGE}
                        srcSet="/profile-480.webp 480w, /profile-800.webp 800w, /profile.webp 1400w"
                        sizes="(min-width: 768px) 384px, 90vw"
                        alt="Portrait of David Peluola"
                        width={800}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                        className="block aspect-[4/5] w-full object-cover"
                    />
                </div>
            </Reveal>

            <Reveal delay={0.06} className="md:col-span-7">
                <span className="eyebrow">About</span>
                <h2 id="about-title" className="mt-4 text-[clamp(1.75rem,3.2vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.025em] text-ink">
                    Hi, I&apos;m David.
                </h2>
                <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-muted">
                    <p>
                        I&apos;m a full-stack developer based in Nigeria, working with clients remotely. I also study Software Engineering
                        at Miva Open University.
                    </p>
                    <p>
                        Most of my work is for businesses: stores, landing pages and web apps that need to look sharp and load fast. The
                        rest is open source: privacy and security tools for crypto, built in public and checked against real chain
                        data.
                    </p>
                    <p>I also contribute to ZecHub, the Zcash community wiki, and make motion explainers for the ecosystem.</p>
                </div>

                <div className="mt-8">
                    <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">Stack</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                        {STACK.map((s) => (
                            <li key={s} className="pill">
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <a href={RESUME_FILES.pdf} className="btn-secondary" download="David_Peluola_Resume.pdf">
                        <FileText className="h-4 w-4" aria-hidden /> Download résumé (PDF, 1 page)
                    </a>
                </div>
            </Reveal>
        </div>
    </section>
);

export default About;
