import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Instagram, Linkedin, Github, CheckCircle2 } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_INFO, CONTACT_PRIVACY_NOTE } from '../../config/constants';
import XIcon from '../common/XIcon';

const PROJECT_TYPES = [
    'Landing Page',
    'Business Website',
    'Catalogue / E-commerce',
    'Web3 Interface',
    'Other',
];

const BUDGET_RANGES = ['₦100k - ₦200k', '₦200k - ₦500k', '₦500k+', 'Not sure yet'];

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: PROJECT_TYPES[0],
        budget: BUDGET_RANGES[3],
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const socialLinks = [
        { Icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
        { Icon: Linkedin, href: SOCIAL_LINKS.linkedIn, label: 'LinkedIn' },
        { Icon: XIcon, href: SOCIAL_LINKS.twitter, label: 'X' },
        { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Project inquiry, ${formData.projectType}, ${formData.name}`);
        const body = encodeURIComponent(
            `Hi,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nProject type: ${formData.projectType}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}\n\nSent from ${CONTACT_INFO.websiteUrl}`,
        );
        window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
        setSubmitted(true);
        window.setTimeout(() => setSubmitted(false), 6000);
    };

    return (
        <div
            id="contact"
            className="relative scroll-mt-28 overflow-hidden rounded-[2.25rem] bg-slate-950 p-7 sm:p-8 md:rounded-[3rem] md:p-14 lg:p-20"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_0%,rgba(124,58,237,0.18),transparent)]" />
            <span className="ui-blob -top-16 -left-10 h-72 w-72 bg-violet-600/20 blur-[110px]" aria-hidden />
            <span className="ui-blob ui-blob-alt -bottom-20 right-10 h-72 w-72 bg-fuchsia-600/15 blur-[120px]" aria-hidden />
            <span className="ui-blob bottom-24 -left-16 h-56 w-56 bg-indigo-600/15 blur-[110px]" aria-hidden />

            <div className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
                <div className="lg:max-w-xl">
                    <span className="ui-eyebrow ui-eyebrow-light">Start a project</span>
                    <h2 className="mt-4 break-words font-display text-[clamp(2.05rem,5.5vw,3.55rem)] font-semibold not-italic leading-[1.08] tracking-tight text-white">
                        Ready when you are. Let&apos;s ship{' '}
                        <span className="text-violet-300">what&apos;s next.</span>
                    </h2>
                    <p className="mt-6 text-[15px] leading-[1.72] text-slate-200 md:text-[16px] md:leading-relaxed">
                        Send a tight brief, links, goals and timeline, and you&apos;ll hear back with honest fit, estimated
                        turnaround and what &quot;done&quot; includes before we touch code.
                    </p>

                    <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="mt-10 group flex flex-wrap items-center gap-4 text-white transition-colors hover:text-violet-200"
                    >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                            <Mail className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="min-w-0 break-all font-sans text-lg font-semibold tracking-tight text-white sm:text-xl">{CONTACT_INFO.email}</span>
                    </a>

                    <div className="mt-12 flex flex-wrap gap-6">
                        {socialLinks.map(({ Icon, href, label }) => (
                            <motion.a
                                key={label}
                                whileHover={{ y: -3 }}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="text-slate-500 transition-colors hover:text-white"
                            >
                                <Icon className="h-5 w-5" aria-hidden />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div
                    id="contact-form"
                    className="scroll-mt-28 rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10"
                >
                    <p className="mb-8 text-[15px] font-medium leading-snug text-slate-300">All fields help me reply with something useful, nothing is stored on this site.</p>
                    <form className="space-y-7" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label htmlFor="contact-name" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                                Name
                            </label>
                            <input
                                id="contact-name"
                                required
                                type="text"
                                autoComplete="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="min-h-[3rem] w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-500 focus:border-violet-400/80 focus:bg-white/[0.09] focus:ring-4 focus:ring-violet-500/25"
                                placeholder="Your name or company"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="contact-email" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                                Email
                            </label>
                            <input
                                id="contact-email"
                                required
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="min-h-[3rem] w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-500 focus:border-violet-400/80 focus:bg-white/[0.09] focus:ring-4 focus:ring-violet-500/25"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
                            <div className="space-y-2">
                                <label htmlFor="contact-type" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                                    Project type
                                </label>
                                <select
                                    id="contact-type"
                                    value={formData.projectType}
                                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                    className="min-h-[3rem] w-full cursor-pointer rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition-[border-color,box-shadow] focus:border-violet-400/80 focus:ring-4 focus:ring-violet-500/25"
                                >
                                    {PROJECT_TYPES.map((t) => (
                                        <option key={t} value={t} className="bg-slate-900 text-white">
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="contact-budget" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                                    Budget range
                                </label>
                                <select
                                    id="contact-budget"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    className="min-h-[3rem] w-full cursor-pointer rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition-[border-color,box-shadow] focus:border-violet-400/80 focus:ring-4 focus:ring-violet-500/25"
                                >
                                    {BUDGET_RANGES.map((b) => (
                                        <option key={b} value={b} className="bg-slate-900 text-white">
                                            {b}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="contact-message" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                                What should I know?
                            </label>
                            <textarea
                                id="contact-message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-500 focus:border-violet-400/80 focus:bg-white/[0.09] focus:ring-4 focus:ring-violet-500/25"
                                placeholder="Goals, deadline, links, competitors, short is fine."
                            />
                        </div>
                        <p className="text-[15px] leading-relaxed text-slate-400">{CONTACT_PRIVACY_NOTE}</p>
                        <AnimatePresence>
                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -6, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-start gap-3 overflow-hidden rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-emerald-200"
                                    role="status"
                                    aria-live="polite"
                                >
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                                    <p className="text-[14px] leading-snug">
                                        Your email app should be opening with everything pre-filled, just hit send. If it
                                        didn&apos;t, reach me at{' '}
                                        <a className="font-semibold underline decoration-emerald-400/50 underline-offset-2" href={`mailto:${CONTACT_INFO.email}`}>
                                            {CONTACT_INFO.email}
                                        </a>.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex min-h-[3.65rem] w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-[13px] font-bold uppercase tracking-[0.16em] text-slate-950 shadow-[0_16px_42px_-14px_rgba(124,58,237,0.35),0_8px_24px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/25 transition-colors hover:bg-violet-100 hover:shadow-[0_18px_48px_-14px_rgba(124,58,237,0.42)] md:text-[14px] md:tracking-[0.14em]"
                        >
                            Send Project Brief
                            <ArrowRight className="h-4 w-4 md:h-[1.125rem] md:w-[1.125rem]" aria-hidden />
                        </motion.button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
