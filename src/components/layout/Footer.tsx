import React from 'react';
import { SOCIAL_LINKS, CONTACT_INFO } from '../../config/constants';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const XIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="currentColor"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const Footer: React.FC = () => {
    const socialLinks = [
        { Icon: Github, href: SOCIAL_LINKS.github },
        { Icon: Linkedin, href: SOCIAL_LINKS.linkedIn },
        { Icon: XIcon, href: SOCIAL_LINKS.twitter },
        { Icon: Instagram, href: SOCIAL_LINKS.instagram }
    ];

    return (
        <footer className="py-24 border-t border-slate-100 flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4">
                <div className="text-slate-900 font-display italic text-4xl">{CONTACT_INFO.shortName}</div>
                <div className="h-px w-12 bg-violet-600/20"></div>
            </div>

            <div className="flex gap-8">
                {socialLinks.map(({ Icon, href }, i) => (
                    <motion.a
                        key={i}
                        whileHover={{ y: -3, scale: 1.1 }}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        <Icon className="w-5 h-5" />
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
