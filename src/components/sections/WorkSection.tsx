import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'Forever Yours',
        desc: 'An interactive, emotion-driven Valentine’s Day web application designed to create shareable, personalized digital experiences with smooth UI constraints.',
        tag: 'Web Application / UX Design',
        img: '/images/work/forever-yours.png',
        link: 'https://valentine.dpeluola.com'
    },
    {
        id: 2,
        title: 'BCCS Hub',
        desc: 'Landing page for Blue Collar Crypto Society, empowering community members with crypto literacy.',
        tag: 'Web / Brand',
        img: '/images/work/bccs-hub.png',
        link: 'https://bccshub.com'
    },
    {
        id: 3,
        title: 'Chef Olamide',
        desc: 'A premium, high-fidelity culinary portfolio for a UK-based Chef de Partie, showcasing modern gastronomy and professional kitchen experience.',
        tag: 'Web Architecture',
        img: '/images/work/chef-olamide.png',
        link: 'https://chefolamide.com'
    }
];

const archiveProjects = [
    {
        id: 4,
        title: 'Onion Price Bot',
        desc: 'A Python-powered Telegram bot delivering real-time meme project analytics, including price, market cap, and volume updates.',
        tag: 'Python / Automation',
        img: '/images/work/onion-price-bot.jpg',
        link: 'https://t.me/myoniontokenupdate_bot'
    },
    {
        id: 5,
        title: 'Chain Alephium',
        desc: 'Fun, educational Web3 content series explaining the Alephium ecosystem through high-energy visual storytelling.',
        tag: 'Web3 Content Creation',
        img: '/images/work/chain-alephium.jpg',
        link: 'https://www.tiktok.com/@chain.alephium'
    },
    {
        id: 6,
        title: 'Inboxx',
        desc: 'A sophisticated platform enabling users to connect with creators through paid messaging, built with modern frontend architecture.',
        tag: 'Web Platform',
        img: '/images/work/inboxx.png',
        link: 'https://inboxx-1e45.vercel.app/'
    },
    {
        id: 7,
        title: 'Hijo Masterpieces',
        desc: 'A timeless landing page for a luxury timepiece brand, focusing on high-end aesthetics.',
        tag: 'E-Commerce / Web',
        img: '/images/work/hijo-masterpieces.png',
        link: 'https://hijo.vercel.app/'
    },
    {
        id: 8,
        title: 'Babelonsol',
        desc: 'Converting AI-generated static imagery into viral TikTok content for the Babel ecosystem on Solana.',
        tag: 'Web3 / Content',
        img: '/images/work/babelonsol.jpg',
        link: 'https://www.tiktok.com/@babelonsol'
    },
    {
        id: 9,
        title: 'Grok Freedom',
        desc: 'Official platform and Web3 creative strategy hub for the Grok Freedom ecosystem, bridging technical blockchain concepts with community engagement.',
        tag: 'Web3 / Digital Strategy',
        img: '/images/work/grok-freedom.png',
        link: 'https://grokfreedom.com'
    },
    {
        id: 10,
        title: 'Herdentity',
        desc: 'A sleek, modern landing page dedicated to identity-rooted confidence for women, featuring sections for mentorship, community building, and leadership skills.',
        tag: 'Frontend Engineering',
        img: '/images/work/herdentity.png',
        link: 'https://herdentity.vercel.app'
    },
    {
        id: 11,
        title: 'Hijo Platform',
        desc: 'A modern, responsive web interface engineered with optimal frontend architecture for high performance and a streamlined user experience.',
        tag: 'React Application',
        img: '/images/work/hijo-platform.png',
        link: 'https://hijo.vercel.app'
    }
];

const WorkSection: React.FC = () => {
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    return (
        <div className="relative">
            <header className="mb-12 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-4"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-600/60">Selected Portfolio / 2022-25</span>
                    <h2 className="text-[12vw] md:text-[8vw] font-display italic text-slate-900 leading-[0.8] tracking-[-0.04em]">
                        Digital <br /> <span className="text-violet-600">Creations.</span>
                    </h2>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 gap-12 md:gap-20">
                {projects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="group grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
                    >
                        <div className="lg:col-span-7 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-slate-100 aspect-[16/10] relative shadow-2xl border border-slate-100">
                            <motion.img
                                src={project.img}
                                alt={project.title}
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-violet-600/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        </div>

                        <div className="lg:col-span-5 flex flex-col items-start px-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">0{idx + 1} // {project.tag}</span>
                            <h3 className="text-5xl md:text-7xl font-display italic text-slate-900 mb-6 leading-none tracking-tight transition-colors group-hover:text-violet-600">
                                {project.title}
                            </h3>
                            <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 text-balance font-light">
                                {project.desc}
                            </p>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-900 pb-1 hover:text-violet-600 hover:border-violet-600 transition-all"
                            >
                                Launch Experience
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <motion.button
                    onClick={() => setIsArchiveOpen(true)}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            className="w-full max-w-7xl h-full bg-[#FAFAFE] rounded-[3rem] md:rounded-[4rem] overflow-hidden flex flex-col relative shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                        >
                            <button
                                onClick={() => setIsArchiveOpen(false)}
                                className="absolute top-8 right-8 z-50 p-4 bg-slate-950 text-white rounded-full hover:bg-violet-600 transition-colors shadow-xl"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex-1 overflow-y-auto p-8 md:p-20">
                                <header className="mb-20">
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-600 mb-4 block">The Vault</span>
                                    <h2 className="text-5xl md:text-7xl font-display italic text-slate-950 leading-none tracking-tighter">
                                        Additional <span className="text-violet-600">Case Studies.</span>
                                    </h2>
                                </header>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                    {archiveProjects.map((project) => (
                                        <motion.a
                                            key={project.id}
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -10 }}
                                            className="group flex flex-col bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:border-violet-100"
                                        >
                                            <div className="aspect-[4/3] rounded-[1.8rem] overflow-hidden mb-8 bg-slate-100">
                                                <img src={project.img} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                            </div>
                                            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-3">{project.tag}</span>
                                            <h4 className="text-2xl font-display italic text-slate-950 mb-4 group-hover:text-violet-600 transition-colors flex items-center justify-between">
                                                {project.title}
                                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </h4>
                                            <p className="text-slate-500 text-sm leading-relaxed font-light mb-6 flex-1">
                                                {project.desc}
                                            </p>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WorkSection;
