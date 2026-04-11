import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Instagram, Linkedin, Github } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_INFO } from '../../config/constants';
import XIcon from '../common/XIcon';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        brief: ''
    });

    const socialLinks = [
        { Icon: Github, href: SOCIAL_LINKS.github },
        { Icon: Linkedin, href: SOCIAL_LINKS.linkedIn },
        { Icon: XIcon, href: SOCIAL_LINKS.twitter },
        { Icon: Instagram, href: SOCIAL_LINKS.instagram }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Inquiry: ${formData.name} from Portfolio`);
        const body = encodeURIComponent(`Hello David,\n\nMy name is ${formData.name} (${formData.email}).\n\nProject Brief:\n${formData.brief}\n\nSent from your Portfolio.`);
        window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="bg-slate-950 rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[50%] h-full bg-violet-600/10 blur-[150px] -z-0"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                <div className="max-w-xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-500 mb-6 block">Inquiries / Bookings</span>
                    <h2 className="text-5xl md:text-7xl font-display italic text-white leading-[0.9] tracking-tighter mb-10">
                        Let's build <br /> <span className="text-violet-500">tomorrow</span> today.
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-12 font-light">
                        My schedule is currently open for selective collaborations. If you're building the future, I'm here to help you architect it.
                    </p>

                    <div className="space-y-8">
                        <a href={`mailto:${CONTACT_INFO.email}`} className="group flex items-center gap-5 text-white/80 hover:text-white transition-colors">
                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-violet-600 transition-all">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="text-2xl font-display italic break-all">{CONTACT_INFO.email}</span>
                        </a>

                        <div className="pt-8 flex gap-6">
                            {socialLinks.map(({ Icon, href }, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-500 hover:text-white transition-colors"
                                >
                                    <Icon className="w-6 h-6" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
                    <form className="space-y-10" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-500">01 // Your Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-violet-500 transition-colors text-lg text-white font-light placeholder:text-slate-800"
                                placeholder="Name or Brand"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-500">02 // Your Email</label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-violet-500 transition-colors text-lg text-white font-light placeholder:text-slate-800"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-500">03 // Project Brief</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.brief}
                                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                                className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-violet-500 transition-colors text-lg text-white font-light placeholder:text-slate-800 resize-none"
                                placeholder="What are we building?"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white text-slate-950 py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-violet-600 hover:text-white transition-all shadow-xl"
                        >
                            Send Inquiry
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
