import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, ChevronDown, Search } from 'lucide-react';
import { PORTFOLIO_HIRE_SUBLINE } from '../../config/constants';

type StudioTheme = 'dark' | 'light';

interface CaseStudy {
    problem: string;
    role: string;
    stack: string;
    outcome: string;
}

interface FeaturedProject {
    id: number;
    title: string;
    desc: string;
    tag: string;
    img: string;
    link: string;
    /** Light = soft surround for bright/romantic UIs; dark = default stage. */
    studioTheme?: StudioTheme;
    caseStudy: CaseStudy;
}

const projects: FeaturedProject[] = [
    {
        id: 1,
        title: 'PrintNest',
        desc: 'A one-click storefront generator with AI-assisted product descriptions—built so founders can spin up a credible shop surface without wrestling copy or layout first.',
        tag: 'Product / AI + Commerce',
        img: '/images/work/printnest.jpg',
        link: 'https://printnest.vercel.app',
        caseStudy: {
            problem: 'Small sellers and creators need to go live quickly, but blank-page syndrome and weak product copy block momentum.',
            role: 'Product UI, onboarding flow, storefront preview patterns, and production deploy on Vercel.',
            stack: 'TypeScript, Next.js, Tailwind CSS, Vercel; AI-assisted copy in-product.',
            outcome: 'A focused generator experience that turns inputs into a publishable storefront narrative—signals product thinking for clients who want landing pages and lightweight commerce.',
        },
    },
    {
        id: 2,
        title: 'Hijo Lux Watches',
        desc: 'Luxury timepiece digital flagship: editorial layout, sharp typography, and a calm e-commerce surface tuned for a premium watch brand.',
        tag: 'E-Commerce / Brand UI',
        img: '/images/work/hijo-hijolux.jpg',
        link: 'https://hijoluxwatches.com',
        caseStudy: {
            problem: 'High-end watches need a site that feels like a salon, not a template—strong imagery hierarchy and restraint.',
            role: 'Frontend build, component structure, responsive polish, and iterative releases aligned with the Hijo Lux product line.',
            stack: 'TypeScript, React, Tailwind CSS, Vercel (repo: Adeolu05/hijo-timepiece; live: hijoluxwatches.com).',
            outcome: 'A production experience that supports the Hijo Lux story with performance and craft suitable for luxury positioning.',
        },
    },
    {
        id: 3,
        title: 'BCCS Hub',
        desc: 'Blue Collar Crypto Society hub and BCCS University—crypto literacy, Web3 onboarding, and community positioning in one branded surface.',
        tag: 'Web / Brand',
        img: '/images/work/bccs-hub.png',
        link: 'https://bccshub.com',
        caseStudy: {
            problem: 'Web3 education pages often feel dense or generic; BCCS needed a credible, dark-mode brand surface that feels premium and readable for beginners.',
            role: 'Frontend architecture & UI implementation: hero, navigation, gradient systems, responsive layout, and production handoff.',
            stack: 'React, TypeScript, Tailwind CSS, Vite, Vercel; content and brand owned by BCCS (repo: Bccs-Website).',
            outcome: 'A clearer entry point for “start learning” journeys with consistent typography, disclaimers, and a layout tuned for wide hero art direction.',
        },
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
        desc: 'Premium Alephium market intelligence via Telegram—prices, charts, pools, farming, wallet summaries, holders, and network stats. Node.js bot with a small REST API for snapshots and future dashboard work.',
        tag: 'Telegram / Web3',
        img: '/images/work/onionlab.png',
        link: 'https://t.me/onionlab_bot',
        thumbContainOnDark: true,
    },
    {
        id: 15,
        title: 'LMS PDF Downloader',
        desc: 'Student-facing tool that automates grabbing PDF course packs from LMS pages and sorts them by week—Playwright-style automation with a clean Vercel UI.',
        tag: 'TypeScript / Automation',
        img: '/images/work/lms-pdf-downloader.jpg',
        link: 'https://lms-pdf-downloader.vercel.app',
    },
    {
        id: 16,
        title: 'Jumpa',
        desc: 'Marketing homepage build—landing structure, responsive layout, and branded sections for product storytelling.',
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
        desc: 'Personal brand and portfolio surface—presentational site with emphasis on clarity, hierarchy, and mobile reading.',
        tag: 'Web / Portfolio',
        img: '/images/work/dami-olatunji.png',
        link: 'https://damiolatunji.com',
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
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-slate-100 text-center px-4"
                    aria-hidden
                >
                    <div className="h-1 w-12 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full w-1/2 rounded-full bg-violet-400 animate-pulse" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Loading preview</span>
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

const caseLabels: { key: keyof CaseStudy; label: string }[] = [
    { key: 'problem', label: 'Problem' },
    { key: 'role', label: 'Role' },
    { key: 'stack', label: 'Stack' },
    { key: 'outcome', label: 'Outcome' },
];

const WorkSection: React.FC = () => {
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [openCaseIds, setOpenCaseIds] = useState<Set<number>>(() => new Set());
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

    const toggleCaseStudy = (id: number) => {
        setOpenCaseIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

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
            <header className="mb-20 md:mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-600/80">Selected Portfolio / 2022-26</span>
                    <h2 className="text-[12vw] md:text-[9vw] font-display italic text-slate-950 leading-[0.75] tracking-[-0.04em]">
                        Digital <br /> <span className="text-violet-600">Creations.</span>
                    </h2>
                    <p className="max-w-2xl text-slate-500 text-base md:text-lg font-light leading-relaxed">
                        I partner with teams and founders on{' '}
                        <span className="text-slate-800 font-medium">landing pages, marketing sites, and product UI</span>
                        —from first sketch to performant React in production. Open to full-time roles and selective freelance builds.
                    </p>
                    <p className="max-w-2xl text-slate-600 text-sm md:text-base font-light leading-relaxed border-l-2 border-violet-200 pl-5">
                        {PORTFOLIO_HIRE_SUBLINE}
                    </p>
                </motion.div>
            </header>

            <div className="flex flex-col gap-32 md:gap-48">
                {projects.map((project, idx) => (
                    <motion.article
                        key={project.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="group grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center"
                        aria-labelledby={`project-title-${project.id}`}
                    >
                        <ProjectPreview project={project} idx={idx} />

                        <div className="lg:col-span-5 flex flex-col items-start px-4 lg:px-8">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-slate-200" />
                                0{idx + 1} // {project.tag}
                            </span>
                            <h3
                                id={`project-title-${project.id}`}
                                className="text-5xl md:text-6xl font-display italic text-slate-950 mb-8 leading-[0.9] tracking-tight transition-colors group-hover:text-violet-600"
                            >
                                {project.title}
                            </h3>
                            <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-8 text-balance font-light max-w-md">{project.desc}</p>

                            <button
                                type="button"
                                onClick={() => toggleCaseStudy(project.id)}
                                aria-expanded={openCaseIds.has(project.id)}
                                className="mb-8 flex items-center gap-2 text-violet-600 font-black text-[10px] uppercase tracking-[0.25em] hover:text-violet-500 transition-colors"
                            >
                                <span>Case study</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-300 ${openCaseIds.has(project.id) ? 'rotate-180' : ''}`}
                                    aria-hidden
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {openCaseIds.has(project.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden w-full max-w-md mb-10"
                                    >
                                        <dl className="space-y-6 border-l-2 border-violet-200 pl-6">
                                            {caseLabels.map(({ key, label }) => (
                                                <div key={key}>
                                                    <dt className="text-[9px] font-black uppercase tracking-[0.35em] text-violet-600/90 mb-2">{label}</dt>
                                                    <dd className="text-slate-600 text-sm md:text-base leading-relaxed font-light">{project.caseStudy[key]}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-3 text-slate-950 font-black text-[10px] uppercase tracking-[0.3em] border-b-2 border-slate-950 pb-2 hover:text-violet-600 hover:border-violet-600 transition-all duration-300"
                            >
                                Launch Experience
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                            </a>
                        </div>
                    </motion.article>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <motion.button
                    type="button"
                    onClick={() => setIsArchiveOpen(true)}
                    aria-expanded={isArchiveOpen}
                    aria-haspopup="dialog"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-14 py-6 bg-slate-950 text-white rounded-full font-bold text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-violet-600 transition-all duration-500 flex items-center gap-4"
                >
                    Explore Full Archive
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
                                        <span className="text-[10px] font-black uppercase tracking-[0.45em] text-violet-600 mb-2 block">The Vault</span>
                                        <h2 id="archive-modal-title" className="text-4xl sm:text-5xl md:text-6xl font-display italic text-slate-950 leading-[0.95] tracking-tighter">
                                            More <span className="text-violet-600">work.</span>
                                        </h2>
                                        <p id="archive-modal-desc" className="mt-3 text-slate-500 text-sm md:text-base font-light leading-relaxed max-w-xl">
                                            Filter by type or search—websites, Web3 & content, and automation projects live here.
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
                                                        px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300
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

                                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400" aria-live="polite">
                                    Showing {filteredArchive.length} of {archiveProjects.length} projects
                                </p>
                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-8 md:px-10 md:py-10">
                                {filteredArchive.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-200 bg-slate-50/80 px-8 py-20 text-center">
                                        <p className="text-slate-600 text-lg font-display italic">No matches in the vault.</p>
                                        <p className="mt-2 text-slate-500 text-sm font-light max-w-md">Try another filter or clear your search.</p>
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
                                                className="group flex flex-col rounded-[2rem] p-px bg-gradient-to-br from-violet-400/25 via-white to-indigo-400/20 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.2)] hover:shadow-[0_28px_48px_-16px_rgba(124,58,237,0.22)] transition-shadow duration-300 outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30"
                                                aria-label={`Open ${project.title} in a new tab`}
                                            >
                                                <div className="flex flex-col h-full rounded-[1.96rem] bg-white p-5 md:p-6 ring-1 ring-slate-900/[0.04]">
                                                    <ArchiveVaultThumb project={project} />
                                                    <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-violet-600/90 mb-2 line-clamp-2">
                                                        {project.tag}
                                                    </span>
                                                    <h3 className="text-xl md:text-2xl font-display italic text-slate-950 mb-3 group-hover:text-violet-600 transition-colors flex items-start justify-between gap-3 leading-tight">
                                                        <span>{project.title}</span>
                                                        <ExternalLink className="w-4 h-4 shrink-0 mt-1 text-slate-300 group-hover:text-violet-500 transition-colors" aria-hidden />
                                                    </h3>
                                                    <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-3 flex-1">{project.desc}</p>
                                                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                                        <span className="font-mono text-[10px] text-slate-400 truncate max-w-[65%]">
                                                            {previewChromeUrl(project.link)}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-violet-600 group-hover:gap-2 transition-all">
                                                            Visit
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
