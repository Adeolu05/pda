import React from 'react';
import { motion } from 'framer-motion';
import { Download, Layers, MessageSquare, Code2, Globe, Cpu } from 'lucide-react';

const Resume: React.FC = () => {
    const experiences = [
        {
            role: 'Frontend Web Development',
            company: 'Aptech Computer Education',
            period: 'Oct 2024 — May 2025',
            desc: 'Intensive specialization in modern web architecture, mastering the full frontend cycle from semantic HTML structure to complex React state management.'
        },
        {
            role: 'Web3 Creative Strategist',
            company: 'Chain Alephium / Independent',
            period: '2023 — Current',
            desc: 'Architecting visual narratives and educational content for blockchain ecosystems, bridging the gap between technical protocols and mainstream users.'
        },
        {
            role: 'Python Automation & Bot Dev',
            company: 'Independent Developer',
            period: 'Nov 2022 — Feb 2023',
            desc: 'Learnt and implemented sophisticated automation scripts and Telegram bots, specializing in real-time API integrations and data processing.'
        }
    ];

    const fullStack = [
        { name: 'HTML5', icon: <Globe className="w-4 h-4" /> },
        { name: 'CSS3', icon: <Layers className="w-4 h-4" /> },
        { name: 'JavaScript', icon: <Code2 className="w-4 h-4" /> },
        { name: 'TypeScript', icon: <Code2 className="w-4 h-4" /> },
        { name: 'React', icon: <Cpu className="w-4 h-4" /> },
        { name: 'Python', icon: <MessageSquare className="w-4 h-4" /> },
        { name: 'Tailwind', icon: <Layers className="w-4 h-4" /> },
        { name: 'Bootstrap', icon: <Layers className="w-4 h-4" /> },
        { name: 'Vercel', icon: <Globe className="w-4 h-4" /> },
    ];

    return (
        <div className="bg-white border border-slate-100 rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 shadow-sm relative overflow-hidden group">
            {/* Decorative Branding */}
            <div className="absolute top-6 right-6 text-[18vw] font-display italic text-slate-50 pointer-events-none select-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000">
                CV.
            </div>

            <div className="relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-20">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-600/60">Professional Summary</span>
                        <h2 className="text-6xl md:text-8xl font-display italic text-slate-900 leading-[0.8] tracking-[-0.04em]">
                            The Path <br /> <span className="text-violet-600">Taken.</span>
                        </h2>
                    </div>
                    <motion.a
                        href="/Peluola_David_Resume.docx"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className="flex items-center gap-4 px-8 py-4 bg-slate-950 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-violet-600 transition-all shadow-xl"
                    >
                        <Download className="w-4 h-4" />
                        View Resume
                    </motion.a>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
                    <div className="lg:col-span-8 space-y-12 md:space-y-16">
                        <section className="space-y-12">
                            {experiences.map((exp, i) => (
                                <div key={i} className="group/item border-l border-slate-100 pl-8 md:pl-10 py-2 relative">
                                    <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-violet-600"></div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-3xl md:text-4xl font-display italic text-slate-900 group-hover/item:text-violet-600 transition-colors leading-[0.9] tracking-[-0.03em]">
                                            {exp.role}
                                        </h3>
                                        <span className="text-[9px] font-bold text-slate-400 mt-2">{exp.period}</span>
                                    </div>
                                    <p className="text-violet-600 text-[10px] font-bold uppercase tracking-widest mb-4">{exp.company}</p>
                                    <p className="text-slate-500 text-lg font-light leading-relaxed max-w-2xl">{exp.desc}</p>
                                </div>
                            ))}
                        </section>
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-3">
                                <Layers className="w-3.5 h-3.5" /> Core Tech Stack
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {fullStack.map(tech => (
                                    <motion.div
                                        key={tech.name}
                                        whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                                        className="flex items-center gap-2.5 px-3 py-3 bg-slate-100/50 border border-slate-200/60 rounded-xl transition-all"
                                    >
                                        <div className="text-violet-600">
                                            {tech.icon}
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="px-2 italic text-slate-400 font-display text-xl leading-relaxed text-balance">
                            "Great interfaces are invisible. They don't demand attention; they facilitate intention."
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
