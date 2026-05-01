import React from 'react';
import { SOCIAL_LINKS, CONTACT_INFO } from '../../config/constants';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import XIcon from '../common/XIcon';

const Footer: React.FC = () => {
    const socialLinks = [
        { Icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
        { Icon: Linkedin, href: SOCIAL_LINKS.linkedIn, label: 'LinkedIn' },
        { Icon: XIcon, href: SOCIAL_LINKS.twitter, label: 'X (Twitter)' },
        { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' }
    ];

    return (
        <footer className="py-12 border-t border-slate-100 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
                <div className="text-slate-900 font-display italic text-4xl">{CONTACT_INFO.shortName}</div>
                <div className="h-px w-12 bg-violet-600/20"></div>
            </div>

            <div className="flex gap-8">
                {socialLinks.map(({ Icon, href, label }, i) => (
                    <motion.a
                        key={i}
                        whileHover={{ y: -3, scale: 1.1 }}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        <Icon className="w-5 h-5" aria-hidden />
                    </motion.a>
                ))}
            </div>

            <div className="flex flex-col items-center gap-2">
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-bold">
                    © {new Date().getFullYear()} — {CONTACT_INFO.label}
                </p>
                {/* <p className="text-slate-300 text-[8px] uppercase tracking-[0.2em]">
                    Built with React & Precision
                </p> */}
            </div>
        </footer>
    );
};

export default Footer;
