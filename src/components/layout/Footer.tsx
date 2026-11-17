import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { CONTACT_INFO, NAV_ITEMS, SOCIAL_LINKS } from '../../config/constants';
import { ExternalLink } from '../common/ui';
import XIcon from '../common/XIcon';
import TelegramIcon from '../common/TelegramIcon';

const socials = [
    { Icon: XIcon, href: SOCIAL_LINKS.twitter, label: 'X (@0xdavee_)' },
    { Icon: TelegramIcon, href: SOCIAL_LINKS.telegram, label: 'Telegram (@dpeluola)' },
    { Icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { Icon: Linkedin, href: SOCIAL_LINKS.linkedIn, label: 'LinkedIn' },
];

const iconBtn =
    'flex h-9 w-9 items-center justify-center rounded-lg border border-line-2 text-muted transition-colors hover:bg-raised hover:text-ink';

const Footer: React.FC = () => (
    <footer className="border-t border-line">
        <div className="container-site flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
            <div>
                <a href="#top" className="font-mono text-[14px] font-medium text-ink">
                    dpeluola<span className="text-accent">.</span>com
                </a>
                <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-muted">Online stores and web apps for businesses, plus open-source tools for crypto.</p>
                <p className="mt-4 inline-flex items-center gap-2 text-[13px] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                    Available for new projects
                </p>
            </div>

            <nav aria-label="Footer">
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                    {NAV_ITEMS.map((i) => (
                        <li key={i.href}>
                            <a href={i.href} className="text-[14px] text-muted hover:text-ink">
                                {i.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <ExternalLink href={SOCIAL_LINKS.dev} className="text-[14px] text-muted hover:text-ink">
                            Writing on DEV
                        </ExternalLink>
                    </li>
                </ul>
            </nav>
        </div>

        <div className="border-t border-line">
            <div className="container-site flex flex-col-reverse gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-faint">
                    <span suppressHydrationWarning>© {new Date().getFullYear()}</span> {CONTACT_INFO.label}
                </p>
                <ul className="flex gap-2" aria-label="Contact and social profiles">
                    <li>
                        <a href={`mailto:${CONTACT_INFO.email}`} aria-label={`Email ${CONTACT_INFO.email}`} className={iconBtn}>
                            <Mail className="h-4 w-4" aria-hidden />
                        </a>
                    </li>
                    {socials.map(({ Icon, href, label }) => (
                        <li key={label}>
                            <ExternalLink href={href} aria-label={label} className={iconBtn}>
                                <Icon className="h-4 w-4" />
                            </ExternalLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </footer>
);

export default Footer;
