import React from 'react';
import { CONTACT_INFO, NAV_ITEMS, SOCIAL_LINKS } from '../../config/constants';
import { TOOLS } from '../../config/content';
import { ExternalLink } from '../common/ui';

const Footer: React.FC = () => (
    <footer className="border-t border-line">
        <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
            <div>
                <a href="#top" className="font-mono text-[14px] font-medium text-ink">
                    dpeluola<span className="text-accent">.</span>com
                </a>
                <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-muted">
                    Full-stack developer. Online stores and web apps for businesses, plus privacy tools for crypto.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 font-mono text-[12px] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                    Available for new projects
                </p>
            </div>

            <nav aria-label="Footer">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">Site</p>
                <ul className="mt-4 space-y-2.5">
                    {NAV_ITEMS.map((i) => (
                        <li key={i.href}>
                            <a href={i.href} className="text-[14px] text-muted hover:text-ink">
                                {i.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div>
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">Tools</p>
                <ul className="mt-4 space-y-2.5">
                    {TOOLS.map((t) => (
                        <li key={t.slug}>
                            <ExternalLink href={t.live} className="text-[14px] text-muted hover:text-ink">
                                {t.name}
                            </ExternalLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">Elsewhere</p>
                <ul className="mt-4 space-y-2.5">
                    <li>
                        <a href={`mailto:${CONTACT_INFO.email}`} className="text-[14px] text-muted hover:text-ink">
                            {CONTACT_INFO.email}
                        </a>
                    </li>
                    <li>
                        <ExternalLink href={SOCIAL_LINKS.twitter} className="text-[14px] text-muted hover:text-ink">
                            X @0xdavee_
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href={SOCIAL_LINKS.telegram} className="text-[14px] text-muted hover:text-ink">
                            Telegram @dpeluola
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href={SOCIAL_LINKS.github} className="text-[14px] text-muted hover:text-ink">
                            GitHub
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href={SOCIAL_LINKS.linkedIn} className="text-[14px] text-muted hover:text-ink">
                            LinkedIn
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href={SOCIAL_LINKS.dev} className="text-[14px] text-muted hover:text-ink">
                            DEV
                        </ExternalLink>
                    </li>
                </ul>
            </div>
        </div>
        <div className="border-t border-line">
            <p className="container-site py-6 font-mono text-[12px] text-faint">
                <span suppressHydrationWarning>© {new Date().getFullYear()}</span> {CONTACT_INFO.label}
            </p>
        </div>
    </footer>
);

export default Footer;
