import React, { useState } from 'react';
import { ArrowRight, CalendarDays, CheckCircle2, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { CONTACT_INFO, CONTACT_PRIVACY_NOTE, SOCIAL_LINKS } from '../../config/constants';
import XIcon from '../common/XIcon';
import TelegramIcon from '../common/TelegramIcon';
import { ExternalLink, Reveal } from '../common/ui';

const PROJECT_TYPES = ['E-commerce store', 'Landing page', 'Business website', 'Web app', 'Crypto / Web3 tooling', 'Other'];

/** Local clients see naira, international clients see USD; both land in the same email. */
const BUDGET_GROUPS = [
    { label: 'Nigeria (₦)', options: ['₦100k - ₦200k', '₦200k - ₦500k', '₦500k+'] },
    { label: 'International ($)', options: ['Under $1,000', '$1,000 - $3,000', '$3,000 - $7,500', '$7,500+'] },
];
const BUDGET_UNSURE = 'Not sure yet';

const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] text-muted">
        {children}
    </label>
);

const Contact: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', projectType: PROJECT_TYPES[0], budget: BUDGET_UNSURE, message: '' });
    const [company, setCompany] = useState(''); // honeypot, hidden from people
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const openMailFallback = () => {
        const subject = encodeURIComponent(`Project inquiry: ${form.projectType}, ${form.name}`);
        const body = encodeURIComponent(
            `Hi David,\n\nName: ${form.name}\nEmail: ${form.email}\nProject type: ${form.projectType}\nBudget: ${form.budget}\n\n${form.message}\n\nSent from ${CONTACT_INFO.websiteUrl}`,
        );
        window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, company }),
            });
            if (!res.ok) throw new Error(String(res.status));
            setStatus('sent');
            setForm((f) => ({ ...f, message: '' }));
        } catch {
            // API unavailable (local dev, missing key, outage): hand off to the visitor's email app
            openMailFallback();
            setStatus('fallback');
        }
    };

    const socials = [
        { Icon: XIcon, href: SOCIAL_LINKS.twitter, label: 'X' },
        { Icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
        { Icon: Linkedin, href: SOCIAL_LINKS.linkedIn, label: 'LinkedIn' },
        { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    ];

    return (
        <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 md:py-32">
            <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-14">
                <Reveal className="lg:col-span-5">
                    <span className="eyebrow">Contact</span>
                    <h2 id="contact-title" className="mt-4 text-[clamp(1.75rem,3.2vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.025em] text-ink">
                        Got a project? Let&apos;s talk.
                    </h2>
                    <p className="mt-5 text-[16px] leading-relaxed text-muted">
                        Send your goals, links and timeline. You&apos;ll get an honest fit check, a price and what &ldquo;done&rdquo; includes
                        before any code. I reply within two business days.
                    </p>

                    <div className="mt-8 space-y-3">
                        <a href={`mailto:${CONTACT_INFO.email}`} className="card card-hover flex items-center gap-4 p-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-accent">
                                <Mail className="h-5 w-5" aria-hidden />
                            </span>
                            <span>
                                <span className="block text-[13px] text-faint">Email</span>
                                <span className="block break-all text-[15px] font-medium text-ink">{CONTACT_INFO.email}</span>
                            </span>
                        </a>
                        <ExternalLink href={SOCIAL_LINKS.telegram} className="card card-hover flex items-center gap-4 p-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-accent">
                                <TelegramIcon className="h-5 w-5" />
                            </span>
                            <span>
                                <span className="block text-[13px] text-faint">Telegram</span>
                                <span className="block text-[15px] font-medium text-ink">@dpeluola</span>
                            </span>
                        </ExternalLink>
                        <ExternalLink href={CONTACT_INFO.bookingUrl} className="card card-hover flex items-center gap-4 p-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-accent">
                                <CalendarDays className="h-5 w-5" aria-hidden />
                            </span>
                            <span>
                                <span className="block text-[13px] text-faint">Prefer to talk?</span>
                                <span className="block text-[15px] font-medium text-ink">Book a free 15-minute call</span>
                            </span>
                        </ExternalLink>
                    </div>

                    <ul className="mt-8 flex gap-2" aria-label="Social profiles">
                        {socials.map(({ Icon, href, label }) => (
                            <li key={label}>
                                <ExternalLink
                                    href={href}
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-2 text-muted transition-colors hover:bg-raised hover:text-ink"
                                >
                                    <Icon className="h-4 w-4" />
                                </ExternalLink>
                            </li>
                        ))}
                    </ul>
                </Reveal>

                <Reveal delay={0.06} className="lg:col-span-7">
                    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="c-name">Name</Label>
                                <input id="c-name" required maxLength={120} autoComplete="name" className="field" value={form.name} onChange={set('name')} />
                            </div>
                            <div>
                                <Label htmlFor="c-email">Email</Label>
                                <input
                                    id="c-email"
                                    type="email"
                                    required
                                    maxLength={200}
                                    autoComplete="email"
                                    className="field"
                                    value={form.email}
                                    onChange={set('email')}
                                />
                            </div>
                            <div>
                                <Label htmlFor="c-type">Project type</Label>
                                <select id="c-type" className="field" value={form.projectType} onChange={set('projectType')}>
                                    {PROJECT_TYPES.map((t) => (
                                        <option key={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="c-budget">Budget</Label>
                                <select id="c-budget" className="field" value={form.budget} onChange={set('budget')}>
                                    <option>{BUDGET_UNSURE}</option>
                                    {BUDGET_GROUPS.map((g) => (
                                        <optgroup key={g.label} label={g.label}>
                                            {g.options.map((o) => (
                                                <option key={o}>{o}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <Label htmlFor="c-message">What should I know?</Label>
                                <textarea
                                    id="c-message"
                                    required
                                    maxLength={5000}
                                    rows={5}
                                    className="field h-auto py-2.5"
                                    placeholder="Goals, links, deadline"
                                    value={form.message}
                                    onChange={set('message')}
                                />
                            </div>
                            {/* Honeypot: visually hidden and skipped by keyboard and screen readers */}
                            <div className="absolute -left-[9999px]" aria-hidden="true">
                                <label htmlFor="c-company">Company</label>
                                <input id="c-company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-[12.5px] leading-relaxed text-faint sm:max-w-xs">{CONTACT_PRIVACY_NOTE}</p>
                            <button type="submit" className="btn-primary" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                                {status === 'sending' ? 'Sending…' : 'Send project brief'}
                                <ArrowRight className="h-4 w-4" aria-hidden />
                            </button>
                        </div>

                        <p role="status" aria-live="polite" className="mt-4 text-[14px]">
                            {status === 'sent' && (
                                <span className="inline-flex items-center gap-2 text-success">
                                    <CheckCircle2 className="h-4 w-4" aria-hidden /> Sent. I&apos;ll reply within two business days.
                                </span>
                            )}
                            {status === 'fallback' && (
                                <span className="text-muted">Your email app should open with the brief filled in. If not, email {CONTACT_INFO.email}.</span>
                            )}
                        </p>
                    </form>
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;
