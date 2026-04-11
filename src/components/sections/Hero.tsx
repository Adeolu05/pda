import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, User, FileText, Mail, ArrowUpRight } from 'lucide-react';
import { PROFILE_IMAGE } from '../../config/constants';

const Hero: React.FC = () => {
    const { scrollY } = useScroll();
    const [imageError, setImageError] = useState(false);

    // Smooth scroll value for better performance on mobile/low-end devices
    const smoothScrollY = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const yP = useTransform(smoothScrollY, [0, 1000], [0, -150]);
    const yD = useTransform(smoothScrollY, [0, 1000], [0, 50]);
    const yA = useTransform(smoothScrollY, [0, 1000], [0, 150]);

    const opacityLetters = useTransform(smoothScrollY, [0, 500], [0.1, 0.02]);

    const menuItems = [
        {
            label: 'Selected Work',
            icon: <Briefcase className="w-3.5 h-3.5 md:w-5 md:h-5" />,
            color: '#FFFFFF',
            textColor: '#0F172A',
            target: '#work',
            position: 'top-[15%] -left-20 sm:-left-24 md:-left-44',
            rotation: -4,
            glow: 'shadow-[0_0_30px_rgba(139,92,246,0.15)]'
        },
        {
            label: 'My Story',
            icon: <User className="w-3.5 h-3.5 md:w-5 md:h-5" />,
            color: '#8B5CF6',
            textColor: '#FFFFFF',
            target: '#about',
            position: 'top-[15%] -right-20 sm:-right-24 md:-right-44',
            rotation: 6,
            glow: 'shadow-[0_0_40px_rgba(139,92,246,0.4)]'
        },
        {
            label: 'My Resume',
            icon: <FileText className="w-3.5 h-3.5 md:w-5 md:h-5" />,
            color: '#1E1B4B',
            textColor: '#E0E7FF',
            target: '#resume',
            position: 'bottom-[15%] -left-20 sm:-left-24 md:-left-44',
            rotation: 3,
            glow: 'shadow-[0_0_30px_rgba(79,70,229,0.2)]'
        },
        {
            label: 'Say Hello',
            icon: <Mail className="w-3.5 h-3.5 md:w-5 md:h-5" />,
            color: '#0F172A',
            textColor: '#FFFFFF',
            target: '#contact',
            position: 'bottom-[15%] -right-20 sm:-right-24 md:-right-44',
            rotation: -6,
            glow: 'shadow-[0_0_20px_rgba(0,0,0,0.1)]'
        }
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center bg-[#FAF9FF]">
            {/* Light Mesh Background Gradients */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        opacity: [0.4, 0.6, 0.4],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"
                />
                <motion.div
                    animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-violet-200/40 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{ x: [30, -30, 30], y: [20, -20, 20] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-100/40 blur-[120px] rounded-full"
                />
            </div>

            {/* Background Letters */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden gap-[4vw] z-10">
                {['P', 'D', 'A'].map((letter, i) => (
                    <motion.div
                        key={letter}
                        style={{
                            y: i === 0 ? yP : i === 1 ? yD : yA,
                            opacity: opacityLetters
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.08, scale: 1 }}
                        transition={{ duration: 2, delay: i * 0.2 }}
                        className="font-display text-[40vw] font-bold text-slate-900 select-none italic transform-gpu tracking-[-0.05em]"
                    >
                        {letter}
                    </motion.div>
                ))}
            </div>

            {/* Central Portrait Container */}
            <div className="relative z-40 px-4 flex flex-col items-center">
                <div className="relative">
                    {/* Navigation Links - Anchored to Frame */}
                    {menuItems.map((item, idx) => (
                        <motion.a
                            key={idx}
                            href={item.target}
                            onClick={(e) => scrollToSection(e, item.target)}
                            style={{
                                backgroundColor: item.color,
                                color: item.textColor
                            }}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                rotate: item.rotation
                            }}
                            whileHover={{
                                scale: 1.05,
                                rotate: 0,
                                boxShadow: "0 25px 50px rgba(139,92,246,0.2)",
                                zIndex: 70
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                opacity: { delay: 2.5 + idx * 0.1 },
                                x: { delay: 2.5 + idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] },
                                rotate: { delay: 3 }
                            }}
                            className={`
                                absolute z-50 flex items-center gap-2 md:gap-3 px-4 md:px-7 py-2 md:py-3.5 rounded-full border border-slate-200 font-bold md:font-black shadow-xl cursor-pointer text-[8px] md:text-[10px] uppercase tracking-widest transition-all group/label transform-gpu whitespace-nowrap
                                ${item.position} ${item.glow}
                            `}
                        >
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="p-0.5 md:p-1 bg-black/5 rounded-full">
                                    {item.icon}
                                </div>
                                <span>{item.label}</span>
                                <ArrowUpRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 opacity-40 group-hover/label:opacity-100 group-hover/label:translate-x-0.5 md:group-hover/label:translate-x-1 group-hover/label:-translate-y-0.5 md:group-hover/label:-translate-y-1 transition-all" />
                            </div>
                        </motion.a>
                    ))}

                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.9, rotateY: 20 }}
                        animate={{ y: 0, opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group p-2 md:p-4 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[2.2rem] md:rounded-[3rem] transform-gpu"
                    >
                        <div className="w-[220px] sm:w-[280px] md:w-[360px] lg:w-[380px] aspect-[4/5] bg-slate-950 rounded-[1.8rem] md:rounded-[2.4rem] relative overflow-hidden flex items-center justify-center">
                            {!imageError ? (
                                <motion.img
                                    initial={{ scale: 1.8 }}
                                    animate={{ scale: 1.5 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    src={PROFILE_IMAGE}
                                    onError={() => setImageError(true)}
                                    alt="Peluola David Adeoluwa"
                                    className="w-full h-full object-cover object-center brightness-[0.55] contrast-[1.2] transition-all duration-1000 group-hover:brightness-[0.65] group-hover:scale-[1.55] transform-gpu"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-12 text-center gap-4">
                                    <span className="text-white font-display italic text-6xl opacity-40">PDA</span>
                                    <p className="text-white/20 text-[8px] uppercase tracking-widest font-bold">Image load failed</p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40"></div>
                        </div>

                        {/* Available badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, rotate: 15 }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                y: [0, -4, 0],
                                rotate: [15, 13, 15]
                            }}
                            transition={{
                                opacity: { delay: 2 },
                                x: { delay: 2 },
                                y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                                rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                            }}
                            className="absolute -top-2 -right-2 md:top-6 md:-right-6 bg-slate-950 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border border-white/10 shadow-2xl z-[60] flex items-center gap-2 pointer-events-none transform-gpu"
                        >
                            <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-widest text-white">Available Now</span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Name Title */}
                <div className="mt-8 text-center overflow-hidden pointer-events-none">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-slate-900 text-4xl md:text-7xl font-display italic mb-2 tracking-[-0.03em] leading-none"
                    >
                        {Array.from("Peluola David Adeoluwa").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 + i * 0.03 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
                        className="h-[0.5px] md:h-px bg-gradient-to-r from-transparent via-violet-600/30 to-transparent mb-2"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 2.5 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <p className="text-slate-500 text-[8px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold">
                            Frontend Architect • Web3 Creative Strategist
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Side Text */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 0.15, x: 0 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute top-12 left-12 hidden md:block"
            >
                <div className="text-slate-900 font-display text-sm italic rotate-[-90deg] origin-left">Based in Africa / Global Delivery</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 0.15, x: 0 }}
                transition={{ delay: 3.2, duration: 1 }}
                className="absolute bottom-12 right-12 hidden md:block"
            >
                <div className="text-slate-900 font-display text-sm italic rotate-[90deg] origin-right">Creative Developer / est. 2022</div>
            </motion.div>

        </div>
    );
};

export default Hero;
