import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, Search } from 'lucide-react';
import { PORTFOLIO_HIRE_SUBLINE } from '../../config/constants';

type StudioTheme = 'dark' | 'light';

interface FeaturedProject {
    id: number;
    title: string;
    desc: string;
    img: string;
    link: string;
    /** Light = soft surround for bright/romantic UIs; dark = default stage. */
    studioTheme?: StudioTheme;
    stackPills: string[];
    /** Per-project accent used on the number pill, underline, title + CTA hover. */
    accent: string;
}

/** Shared accent palette so archive cards rotate through the same family. */
const ACCENT_PALETTE = ['#7C3AED', '#4F46E5', '#DB2777', '#0EA5E9', '#16A34A', '#EA580C'];

const projects: FeaturedProject[] = [
    {
        id: 1,
        title: 'Hijo Lux Watches',
        desc: 'Luxury catalogue with WhatsApp checkout, inventory and merchandising stay in the CMS, no engineer required for day-to-day updates.',
        img: '/images/work/hijo-hijolux.jpg',
        link: 'https://hijoluxwatches.com',
        studioTheme: 'light',
        stackPills: ['Next.js', 'Tailwind', 'Sanity', 'Vercel'],
        accent: '#7C3AED',
    },
    {
        id: 2,
        title: 'PrintNest',
        desc: 'High-intent landing that explains the workflow in one scroll, right leads self-select before they enquire.',
        img: '/images/work/printnest.jpg',
        link: 'https://printnest.vercel.app',
        stackPills: ['React', 'Tailwind', 'Vercel'],
        accent: '#4F46E5',
    },
    {
        id: 3,
        title: 'BCCS Hub',
        desc: 'Structured Web3 learning gateway, plain hierarchy so newcomers stay oriented instead of overwhelmed.',
        img: '/images/work/bccs-hub.png',
        link: 'https://bccshub.com',
        stackPills: ['React', 'TypeScript', 'Tailwind', 'Web3 UI'],
        accent: '#DB2777',
    },
];

type ArchiveFilterTab = 'all' | 'websites' | 'content' | 'automation';

interface ArchiveProject {
    id: number;
    title: string;
    desc: string;
    tag: string;
    img: string;
    link: string;
    /** Mascot / logo art: show full frame on dark bg */
    thumbContainOnDark?: boolean;
    /** Wait for decode before showing (heavy remote screenshots) */
    deferThumbUntilLoaded?: boolean;
}

function archiveMatchesFilter(project: ArchiveProject, tab: ArchiveFilterTab): boolean {
    const link = project.link.toLowerCase();
    const tag = project.tag.toLowerCase();
    if (tab === 'all') return true;
    if (tab === 'websites') {
        return !link.includes('tiktok.com') && !link.includes('t.me');
    }
    if (tab === 'content') {
        return link.includes('tiktok.com') || tag.includes('web3') || tag.includes('content');
    }
    if (tab === 'automation') {
        return link.includes('t.me') || tag.includes('python') || tag.includes('automation');
    }
    return true;
}

const archiveFilterTabs: { id: ArchiveFilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'websites', label: 'Websites' },
    { id: 'content', label: 'Web3 & content' },
    { id: 'automation', label: 'Bots & tools' },
];

const archiveProjects: ArchiveProject[] = [
    {
        id: 4,
        title: 'Onion Price Bot',
        desc: 'A Python-powered Telegram bot delivering real-time meme project analytics, including price, market cap, and volume updates.',
        tag: 'Python / Automation',
        img: '/images/work/onion-price-bot.jpg',
        link: 'https://t.me/myoniontokenupdate_bot',
    },
    {
        id: 5,
        title: 'Chain Alephium',
        desc: 'Fun, educational Web3 content series explaining the Alephium ecosystem through high-energy visual storytelling.',
        tag: 'Web3 Content Creation',
        img: '/images/work/chain-alephium.jpg',
        link: 'https://www.tiktok.com/@chain.alephium',
    },
    {
        id: 6,
        title: 'Inboxx',
        desc: 'A sophisticated platform enabling users to connect with creators through paid messaging, built with modern frontend architecture.',
        tag: 'Web Platform',
        img: '/images/work/inboxx.png',
        link: 'https://inboxx-ebon.vercel.app/',
    },
    {
        id: 8,
        title: 'Babelonsol',
        desc: 'Converting AI-generated static imagery into viral TikTok content for the Babel ecosystem on Solana.',
        tag: 'Web3 / Content',
        img: '/images/work/babelonsol.jpg',
        link: 'https://www.tiktok.com/@babelonsol',
    },
    {
        id: 9,
        title: 'Grok Freedom',
        desc: 'Official platform and Web3 creative strategy hub for the Grok Freedom ecosystem, bridging technical blockchain concepts with community engagement.',
        tag: 'Web3 / Digital Strategy',
        img: '/images/work/grok-freedom.png',
        link: 'https://grokfreedom.com',
    },
    {
        id: 10,
        title: 'Herdentity',
        desc: 'A sleek, modern landing page dedicated to identity-rooted confidence for women, featuring sections for mentorship, community building, and leadership skills.',
        tag: 'Frontend Engineering',
        img: '/images/work/herdentity.png',
        link: 'https://herdentity.vercel.app',
    },
    {
        id: 11,
        title: 'Hijo Platform',
        desc: 'A modern, responsive web interface engineered with optimal frontend architecture for high performance and a streamlined user experience.',
        tag: 'React Application',
        img: '/images/work/hijo-platform.png',
        link: 'https://hijo.vercel.app',
    },
    {
        id: 12,
        title: 'Forever Yours',
        desc: "An interactive, emotion-driven Valentine's Day web application designed to create shareable, personalized digital experiences with smooth UI constraints.",
        tag: 'Web Application / UX Design',
        img: '/images/work/forever-yours.png',
        link: 'https://valentine.dpeluola.com',
    },
    {
        id: 13,
        title: 'Chef Olamide',
        desc: 'A premium, high-fidelity culinary portfolio for a UK-based Chef de Partie, showcasing modern gastronomy and professional kitchen experience.',
        tag: 'Web Architecture',
        img: '/images/work/chef-olamide.png',
        link: 'https://chefolamide.com',
    },
    {
        id: 14,
        title: 'OnionLab',
        desc: 'Premium Alephium market intelligence via Telegram, prices, charts, pools, farming, wallet summaries, holders, and network stats. Node.js bot with a small REST API for snapshots and future dashboard work.',
        tag: 'Telegram / Web3',
        img: '/images/work/onionlab.png',
        link: 'https://t.me/onionlab_bot',
        thumbContainOnDark: true,
    },
    {
        id: 15,
        title: 'LMS PDF Downloader',
        desc: 'Student-facing tool that automates grabbing PDF course packs from LMS pages and sorts them by week, Playwright-style automation with a clean Vercel UI.',
        tag: 'TypeScript / Automation',
        img: '/images/work/lms-pdf-downloader.jpg',
        link: 'https://lms-pdf-downloader.vercel.app',
    },
    {
        id: 16,
        title: 'Jumpa',
        desc: 'Marketing homepage build, landing structure, responsive layout, and branded sections for product storytelling.',
        tag: 'Web / Landing',
        img: '/images/work/jumpa-homepage.jpg',
        link: 'https://jumpa-homepage.vercel.app',
    },
    {
        id: 17,
        title: 'Celebration House',
        desc: 'Church organization site with clear service information, community positioning, and a calm, trustworthy visual tone.',
        tag: 'Web / Community',
        img: '/images/work/celebration-house.jpg',
        link: 'https://celebration-house.vercel.app',
    },
    {
        id: 18,
        title: 'Dami Olatunji',
        desc: 'Personal brand and portfolio surface, presentational site with emphasis on clarity, hierarchy, and mobile reading.',
        tag: 'Web / Portfolio',
        img: '/images/work/dami-olatunji.png',
        link: 'https://damiolatunji.com',
    },
    {
        id: 19,
        title: "Tomijoke's Cakes",
        desc: 'Conversion-focused storefront for an Abeokuta bakery, fresh-cake catalogue, category guides, and one-tap WhatsApp ordering for birthdays, weddings, and events.',
        tag: 'Web / Small Business',
        img: '/images/work/tomijoke.jpg',
        link: 'https://tomijoke-cakes.vercel.app',
    },
    {
        id: 20,
        title: "Lara's Confections",
        desc: 'Warm, elegant landing for an Ogun State confectionery brand, treats showcase, simple order guide, and direct WhatsApp checkout.',
        tag: 'Web / Small Business',
        img: '/images/work/lara-collection.jpg',
        link: 'https://larascollection.vercel.app',
    },
    {
        id: 21,
        title: 'Sweet Zoey Bakehouse',
        desc: 'Soft, editorial bakery site with a menu, order walkthrough, and location section, built to turn browsers into WhatsApp orders.',
        tag: 'Web / Small Business',
        img: '/images/work/sweet-zoey.jpg',
        link: 'https://sweet-zoey.vercel.app',
    },
    {
        id: 22,
        title: "God's Favor Cakes",
        desc: 'Full bakery marketing site with a filterable gallery, transparent price guide, FAQs, and integrated live chat for fast custom-cake enquiries.',
        tag: 'Web / Small Business',
        img: '/images/work/gods-favour.jpg',
        link: 'https://godsfavour-pi.vercel.app',
    },
    {
        id: 23,
        title: '24/01 Cakes',
        desc: 'Moody, premium one-page site for a bespoke Abeokuta patisserie, signature collections, brand story, and a consultation booking CTA.',
        tag: 'Web / Small Business',
        img: '/images/work/2401-cakes.jpg',
        link: 'https://24-01.vercel.app',
    },
    {
        id: 24,
        title: 'Shubby',
        desc: 'Personal brand and newsletter hub for a storyteller and relationship curator, dark editorial layout with series, highlights, and subscribe flows.',
        tag: 'Web / Personal Brand',
        img: '/images/work/shuuby.jpg',
        link: 'https://shubby-eta.vercel.app',
    },
    {
        id: 25,
        title: 'Oluwaseun Akinola',
        desc: 'Speaker and advocacy portfolio for an emerging diplomat, impact pillars, speaking engagements, gallery, and a built-in invitation form.',
        tag: 'Web / Personal Brand',
        img: '/images/work/oluwaseun-akinola.jpg',
        link: 'https://oluwaseunakinola.vercel.app',
    },
    {
        id: 26,
        title: 'TranscriptFlow',
        desc: 'Product site for a YouTube and Vimeo transcript extractor, paste a link and get a clean TXT, PDF, or DOCX file via the web app or Telegram bot.',
        tag: 'SaaS / Automation',
        img: '/images/work/transcriptflow.jpg',
        link: 'https://www.usetranscriptflow.com',
    },
    {
        id: 27,
        title: 'BitGuess',
        desc: 'Web3 prediction game on Alephium, players stake ALPH on daily BTC move buckets with wallet connect, live pools, and on-chain settlement.',
        tag: 'Web3 / dApp',
        img: '/images/work/bitguess.jpg',
        link: 'https://bitguess.vercel.app',
    },
    {
        id: 28,
        title: 'Live Stream AI Avatar',
        desc: 'Interactive AI avatar that reads and responds to live-stream comments in real time, with a token-based usage model and a live transcript panel.',
        tag: 'React / AI Tool',
        img: '/images/work/livestream-ai-avatar.jpg',
        link: 'https://livestream-ai-avatar.vercel.app',
    },
    {
        id: 29,
        title: 'RCCG Glorious Premier',
        desc: 'Complete church website for RCCG Ogun Province 12, service schedules, ministries, events, copy-to-clipboard giving details, and a prayer-request form.',
        tag: 'Web / Community',
        img: '/images/work/ogp12-church.jpg',
        link: 'https://ogp12.vercel.app',
    },
];

function ArchiveVaultThumb({
    project,
}: {
    project: ArchiveProject;
}) {
    const [loaded, setLoaded] = useState(false);
    const containDark = project.thumbContainOnDark ?? false;

    return (
        <div
            className={`
                relative aspect-[4/3] rounded-[1.35rem] overflow-hidden mb-6 ring-1 ring-inset ring-black/[0.05]
                ${containDark ? 'bg-black' : 'bg-gradient-to-br from-slate-100 to-slate-200/70'}
            `}
        >
            {project.deferThumbUntilLoaded && !loaded && (
                <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-slate-100 px-4"
                    aria-busy="true"
                    aria-live="polite"
                >
                    <span className="sr-only">Loading preview</span>
                    <div className="h-1 w-12 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full w-1/2 animate-pulse rounded-full bg-violet-400" />
                    </div>
                </div>
            )}
            <img
                src={project.img}
                alt=""
                onLoad={() => setLoaded(true)}
                className={`
                    h-full w-full transition-all duration-700 ease-out
                    ${containDark ? 'object-contain object-center p-4 sm:p-6 grayscale-0 group-hover:scale-[1.02]' : 'object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-[1.04]'}
                    ${project.deferThumbUntilLoaded && !loaded ? 'opacity-0' : 'opacity-100'}
                `}
                loading={project.deferThumbUntilLoaded ? 'eager' : 'lazy'}
                decoding="async"
            />
        </div>
    );
}

function previewChromeUrl(link: string) {
    try {
        return new URL(link).hostname.replace(/^www\./, '');
    } catch {
        return 'preview';
    }
}

function ProjectPreview({ project, idx }: { project: FeaturedProject; idx: number }) {
    const host = previewChromeUrl(project.link);
    const theme = project.studioTheme ?? 'dark';
    const isLight = theme === 'light';

    const chrome = (
        <div
            className={`
                shrink-0 flex items-center gap-3 px-4 py-3 border-b backdrop-blur-md
                ${isLight ? 'bg-slate-50/95 border-slate-200/70' : 'bg-slate-900/95 border-white/[0.08]'}
            `}
        >
            <span className="flex gap-1.5" aria-hidden>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/90 shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 shadow-sm" />
            </span>
            <div
                className={`
                    flex-1 min-w-0 rounded-lg px-3 py-1.5 text-[10px] sm:text-[11px] font-mono truncate tracking-tight
                    ${isLight ? 'bg-white text-slate-500 ring-1 ring-slate-200/80' : 'bg-slate-950/60 text-slate-500 ring-1 ring-white/[0.06]'}
                `}
                title={host}
            >
                <span className={isLight ? 'text-slate-400' : 'text-slate-400/80'}>https://</span>
                {host}
            </div>
        </div>
    );

    const outerShell = (children: React.ReactNode, orderClass: string) => (
        <div
            className={`
                lg:col-span-7 relative ${orderClass}
                rounded-[2.25rem] md:rounded-[3.25rem] p-px
                bg-gradient-to-br from-violet-400/35 via-white/90 to-indigo-400/25
                shadow-[0_28px_56px_-16px_rgba(15,23,42,0.22),0_0_0_1px_rgba(15,23,42,0.04)]
                group-hover:shadow-[0_36px_72px_-16px_rgba(124,58,237,0.18),0_0_0_1px_rgba(124,58,237,0.12)]
                transition-[box-shadow] duration-700 ease-out
            `}
        >
            <div className="rounded-[2.2rem] md:rounded-[3.2rem] overflow-hidden bg-slate-100/50 ring-1 ring-slate-900/[0.03]">
                {children}
            </div>
        </div>
    );

    const stageClass = isLight
        ? `
            relative w-full min-h-[220px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[460px]
            flex items-center justify-center py-8 px-4 sm:px-5 md:px-7 lg:px-9
            bg-[radial-gradient(ellipse_90%_70%_at_50%_18%,rgba(244,114,182,0.10),transparent_58%),linear-gradient(to_bottom,#faf7fb,#f4f4f5_45%,#fdf2f8)]
        `
        : `
            relative w-full min-h-[220px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[460px]
            flex items-center justify-center py-8 px-4 sm:px-5 md:px-7 lg:px-9
            bg-[radial-gradient(ellipse_85%_65%_at_50%_35%,rgba(139,92,246,0.14),transparent_55%),radial-gradient(ellipse_60%_45%_at_80%_90%,rgba(79,70,229,0.12),transparent_50%),#020617]
        `;

    const shotRing = isLight
        ? 'ring-1 ring-slate-300/70 shadow-[0_24px_48px_-14px_rgba(15,23,42,0.18),inset_0_1px_0_0_rgba(255,255,255,0.9)]'
        : 'ring-1 ring-white/[0.12] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.06)]';

    const bottomFade = isLight
        ? 'from-slate-50 via-slate-50/50 to-transparent'
        : 'from-slate-950 via-slate-950/40 to-transparent';

    return outerShell(
        <>
            {chrome}
            <div className={stageClass}>
                {!isLight && (
                    <div
                        className="absolute inset-0 opacity-[0.35] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                    />
                )}
                {isLight && (
                    <div
                        className="absolute inset-0 opacity-[0.2] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                    />
                )}
                <motion.div
                    className="relative z-[1] w-full max-w-full flex items-center justify-center"
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                >
                    <div className={`relative rounded-2xl md:rounded-[1.35rem] overflow-hidden max-w-full ${shotRing}`}>
                        <img
                            src={project.img}
                            alt=""
                            className="block w-full max-w-full h-auto max-h-[min(62vh,640px)] object-contain object-center mx-auto"
                            loading={idx === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                        />
                    </div>
                </motion.div>
                <div className={`absolute inset-x-0 bottom-0 h-20 md:h-24 bg-gradient-to-t ${bottomFade} pointer-events-none z-[2]`} />
            </div>
        </>,
        idx % 2 === 1 ? 'lg:order-last' : '',
    );
}

const WorkSection: React.FC = () => {
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [archiveSearch, setArchiveSearch] = useState('');
    const [archiveFilter, setArchiveFilter] = useState<ArchiveFilterTab>('all');
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const archiveSearchRef = useRef<HTMLInputElement>(null);

    const filteredArchive = useMemo(() => {
        const q = archiveSearch.trim().toLowerCase();
        return archiveProjects.filter((project) => {
            if (!archiveMatchesFilter(project, archiveFilter)) return false;
            if (!q) return true;
            const host = (() => {
                try {
                    return new URL(project.link).hostname.replace(/^www\./, '');
                } catch {
                    return '';
                }
            })();
            const hay = `${project.title} ${project.desc} ${project.tag} ${host}`.toLowerCase();
            return hay.includes(q);
        });
    }, [archiveSearch, archiveFilter]);

    useEffect(() => {
        if (!isArchiveOpen) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsArchiveOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        setArchiveSearch('');
        setArchiveFilter('all');
        const focusT = window.setTimeout(() => archiveSearchRef.current?.focus(), 80);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKeyDown);
            window.clearTimeout(focusT);
        };
    }, [isArchiveOpen]);

    return (
        <div className="relative">
            <header className="mb-14 md:mb-[4.5rem] lg:mb-[5.5rem]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex max-w-3xl flex-col gap-6 md:gap-8"
                >
                    <span className="ui-eyebrow">Selected work</span>
                    <h2 className="font-display text-[clamp(2.05rem,5.5vw,3.45rem)] font-semibold not-italic leading-[1.08] tracking-[-0.02em] text-slate-950">
                        Selected builds you can <span className="text-violet-700">explore live</span>
                    </h2>
                    <p className="max-w-2xl text-[15px] leading-[1.72] text-slate-800 md:text-[17px] md:leading-relaxed">
                        Commerce, launches and Web3 surfaces, each row below is shipped code with a public URL.{' '}
                        <span className="text-slate-900">{PORTFOLIO_HIRE_SUBLINE}</span>
                    </p>
                </motion.div>
            </header>

            <div className="flex flex-col gap-[4.5rem] md:gap-28 lg:gap-[8.5rem]">
                {projects.map((project, idx) => (
                    <motion.article
                        key={project.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="group grid grid-cols-1 items-center gap-14 md:gap-16 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-6 xl:gap-x-20"
                        style={{ ['--accent' as string]: project.accent }}
                        aria-labelledby={`project-title-${project.id}`}
                    >
                        <ProjectPreview project={project} idx={idx} />

                        <div className="flex flex-col items-stretch lg:col-span-5 lg:pl-1 xl:pl-5">
                            <div className="mb-5 flex items-center gap-3">
                                <span
                                    className="ui-pill"
                                    style={{ backgroundColor: project.accent }}
                                >
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span
                                    className="ui-underline"
                                    style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
                                    aria-hidden
                                />
                            </div>
                            <h3
                                id={`project-title-${project.id}`}
                                className="mb-5 font-sans text-[clamp(1.375rem,3.8vw,1.875rem)] font-semibold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-[var(--accent)] md:mb-6 md:text-[clamp(1.5rem,3vw,2rem)]"
                            >
                                {project.title}
                            </h3>
                            <p className="mb-8 max-w-lg text-[16px] font-normal leading-relaxed text-slate-800 md:text-[17px] md:leading-[1.65]">
                                {project.desc}
                            </p>

                            <div className="mb-10 flex flex-wrap gap-2 md:gap-2.5">
                                {project.stackPills.map((pill) => (
                                    <span
                                        key={pill}
                                        className="rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 font-sans text-[13px] font-medium tracking-tight text-slate-800 shadow-sm sm:px-4 sm:py-2"
                                    >
                                        {pill}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[2.875rem] w-full max-w-lg items-center justify-center gap-1.5 rounded-full bg-slate-950 px-5 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_10px_28px_-14px_rgba(15,23,42,0.45)] ring-1 ring-slate-950/80 ring-offset-2 ring-offset-[#FAF9FF] transition-[background-color,box-shadow,transform] hover:bg-[var(--accent)] hover:shadow-[0_14px_34px_-12px_var(--accent)] active:scale-[0.99] sm:min-h-12 sm:px-6 sm:text-[11.5px] sm:tracking-[0.11em]"
                            >
                                View live site
                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
                            </a>
                        </div>
                    </motion.article>
                ))}
            </div>

            <div className="mt-20 flex justify-center px-4 md:mt-24">
                <motion.button
                    type="button"
                    onClick={() => setIsArchiveOpen(true)}
                    aria-expanded={isArchiveOpen}
                    aria-haspopup="dialog"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex min-h-[3.5rem] w-full max-w-md items-center justify-center rounded-full bg-slate-950 px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-xl transition-colors hover:bg-violet-600 sm:w-auto sm:min-w-[280px]"
                >
                    More projects in the vault
                </motion.button>
            </div>

            <AnimatePresence>
                {isArchiveOpen && (
                    <motion.div
                        role="presentation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10050] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
                        onClick={() => setIsArchiveOpen(false)}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="archive-modal-title"
                            aria-describedby="archive-modal-desc"
                            initial={{ scale: 0.96, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 24 }}
                            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                            className="w-full max-w-7xl max-h-[min(92vh,940px)] min-h-0 flex flex-col bg-[#FAFAFE] rounded-[2rem] md:rounded-[2.75rem] overflow-hidden relative shadow-[0_0_120px_rgba(0,0,0,0.45)] ring-1 ring-white/60"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="shrink-0 px-6 pt-6 pb-5 md:px-10 md:pt-10 md:pb-6 border-b border-slate-200/70 bg-[#FAFAFE]/95 backdrop-blur-md">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                                    <header className="min-w-0 flex-1">
                                        <h2 id="archive-modal-title" className="text-[clamp(1.85rem,4.5vw,3.25rem)] font-display font-semibold not-italic leading-[1.08] tracking-tight text-slate-950">
                                            Archive.
                                        </h2>
                                        <p id="archive-modal-desc" className="mt-3 max-w-xl text-[15px] font-normal leading-relaxed text-slate-700 md:text-[16px]">
                                            Filter by type or search, websites, Web3 & content, and automation projects live here.
                                        </p>
                                    </header>
                                    <button
                                        ref={closeButtonRef}
                                        type="button"
                                        onClick={() => setIsArchiveOpen(false)}
                                        aria-label="Close portfolio archive"
                                        className="shrink-0 self-start sm:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-violet-600 transition-colors shadow-lg"
                                    >
                                        <X className="w-4 h-4" aria-hidden />
                                        Close
                                    </button>
                                </div>

                                <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div
                                        className="flex flex-wrap gap-2"
                                        role="tablist"
                                        aria-label="Project category"
                                    >
                                        {archiveFilterTabs.map((tab) => {
                                            const active = archiveFilter === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    role="tab"
                                                    aria-selected={active}
                                                    onClick={() => setArchiveFilter(tab.id)}
                                                    className={`
                                                        px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300
                                                        ${active ? 'bg-slate-950 text-white shadow-md' : 'bg-white text-slate-500 ring-1 ring-slate-200/80 hover:ring-violet-300 hover:text-slate-800'}
                                                    `}
                                                >
                                                    {tab.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="relative w-full lg:max-w-md">
                                        <Search
                                            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none"
                                            aria-hidden
                                        />
                                        <input
                                            ref={archiveSearchRef}
                                            type="search"
                                            value={archiveSearch}
                                            onChange={(e) => setArchiveSearch(e.target.value)}
                                            placeholder="Search title, stack, or domain…"
                                            aria-label="Search archive projects"
                                            className="w-full rounded-2xl border border-slate-200/90 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none ring-violet-500/0 transition-shadow focus:border-violet-300 focus:ring-4 focus:ring-violet-500/15"
                                        />
                                    </div>
                                </div>

                                <p className="mt-4 text-[14px] text-slate-600" aria-live="polite">
                                    {filteredArchive.length} of {archiveProjects.length} projects
                                </p>
                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-8 md:px-10 md:py-10">
                                {filteredArchive.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-200 bg-slate-50/80 px-8 py-20 text-center">
                                        <p className="text-slate-700 text-[17px] font-semibold leading-snug">No matches in the vault.</p>
                                        <p className="mt-2 max-w-md text-[15px] font-normal leading-relaxed text-slate-600">Try another filter or clear your search.</p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setArchiveSearch('');
                                                setArchiveFilter('all');
                                            }}
                                            className="mt-8 px-8 py-3 rounded-full bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.25em] hover:bg-violet-600 transition-colors"
                                        >
                                            Reset filters
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                                        {filteredArchive.map((project, i) => (
                                            <motion.a
                                                key={project.id}
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 18 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: Math.min(i * 0.045, 0.35),
                                                    duration: 0.4,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                whileHover={{ y: -6 }}
                                                style={{ ['--accent' as string]: ACCENT_PALETTE[i % ACCENT_PALETTE.length] }}
                                                className="group flex flex-col rounded-[2rem] p-px bg-gradient-to-br from-violet-400/25 via-white to-indigo-400/20 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.2)] hover:shadow-[0_28px_48px_-16px_var(--accent)] transition-shadow duration-300 outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30"
                                                aria-label={`Open ${project.title} in a new tab`}
                                            >
                                                <div className="flex flex-col h-full rounded-[1.96rem] bg-white p-5 md:p-6 ring-1 ring-slate-900/[0.04]">
                                                    <ArchiveVaultThumb project={project} />
                                                    <h3 className="mb-3 flex items-start justify-between gap-3 text-lg font-sans font-semibold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-[var(--accent)] md:text-xl">
                                                        <span>{project.title}</span>
                                                        <ExternalLink className="w-4 h-4 shrink-0 mt-1 text-slate-300 transition-colors group-hover:text-[var(--accent)]" aria-hidden />
                                                    </h3>
                                                    <p className="flex-1 text-[15px] font-normal leading-relaxed text-slate-700 line-clamp-3">{project.desc}</p>
                                                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                                        <span className="max-w-[65%] truncate font-sans text-[13px] text-slate-500">
                                                            {previewChromeUrl(project.link)}
                                                        </span>
                                                        <span className="flex items-center gap-1 font-sans text-[13px] font-semibold text-[var(--accent)] transition-all group-hover:gap-2">
                                                            Open
                                                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WorkSection;
