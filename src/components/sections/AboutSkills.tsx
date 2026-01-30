import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { PROFILE_IMAGE } from '../../config/constants';

const AboutSkills: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [imageError, setImageError] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.4, 1.6]);
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

    const stack = [
        { category: 'Frontend', items: ['React / TypeScript', 'Next.js / Vercel', 'Tailwind CSS', 'Bootstrap'] },
        { category: 'Development', items: ['Python Automation', 'Telegram Bot API', 'ES6+ JavaScript', 'HTML5 / CSS3'] },
        { category: 'Creative', items: ['UI/UX Design', 'Web3 Strategy', 'Video Content', 'Visual Storytelling'] }
    ];

    const titleText = "About Me";

    return (
        <div className="relative" ref={containerRef}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                {/* Profile Image Column */}
                <div className="lg:col-span-5 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-slate-950 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10 border border-slate-200/50 p-2 md:p-4 bg-white/40 backdrop-blur-3xl">
                            <div className="w-full h-full overflow-hidden rounded-[2rem] md:rounded-[2.8rem] relative flex items-center justify-center bg-slate-900">
                                {!imageError ? (
                                    <motion.img
                                        style={{ scale: imageScale, y: imageY }}
                                        src={PROFILE_IMAGE}
                                        onError={() => setImageError(true)}
                                        className="w-full h-full object-cover object-[50%_12%] brightness-[0.6] contrast-[1.15] transition-all duration-1000 origin-center"
                                        alt="David Adeoluwa"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                        <span className="text-white font-display italic text-7xl opacity-10">PDA</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

                                <div className="absolute bottom-8 left-8 right-8 z-20">
                                    <p className="text-white font-display text-2xl md:text-3xl italic mb-2 tracking-tight">The Creative Architect.</p>
                                    <div className="h-0.5 w-12 bg-violet-400"></div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
                            className="absolute -top-10 -right-10 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full -z-0"
                        ></motion.div>
                    </motion.div>
                </div>

                {/* Text Content Column */}
                <div className="lg:col-span-7">
                    <header className="mb-12">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-600 mb-6 block">Biography</span>
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-7xl md:text-[9vw] font-display italic text-slate-900 leading-[0.8] tracking-[-0.04em]"
                        >
                            {titleText.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h2>
                    </header>

                    <div className="space-y-8 text-slate-500 text-lg md:text-xl leading-relaxed font-light">
                        <p>
                            I am a <span className="text-slate-950 font-medium italic">Frontend Architect and Python Developer</span> trained at Aptech Computer Education. My journey started with Pythonic automation, where I mastered the art of building intelligent Telegram bots and streamlined digital systems.
                        </p>
                        <p>
                            Today, I specialize in crafting <span className="text-violet-600 font-semibold underline decoration-violet-100 underline-offset-8">high-fidelity web interfaces</span> and Web3 creative strategies. Whether I'm architecting a React platform or engineering a community bot, I focus on performance, precision, and impact.
                        </p>
                    </div>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-slate-100 pt-16">
                        {stack.map((group, i) => (
                            <motion.div
                                key={group.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">{group.category}</h4>
                                <ul className="space-y-4">
                                    {group.items.map(item => (
                                        <li key={item} className="flex items-center gap-3 text-slate-950 font-semibold text-xs tracking-tight">
                                            <div className="w-5 h-5 rounded-full bg-violet-50 flex items-center justify-center border border-violet-100/50">
                                                <Check className="w-3 h-3 text-violet-600" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutSkills;
