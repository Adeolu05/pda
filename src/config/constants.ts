export const PROFILE_IMAGE = "/profile.jpg";

/** Matches floating nav on scroll, keep labels short for the pill layout */
export const NAV_ITEMS = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#resume' },
    { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS = {
    linkedIn: "https://www.linkedin.com/in/david-peluola-6b45761b4",
    github: "https://github.com/Adeolu05",
    twitter: "https://twitter.com/alphvibes",
    instagram: "https://www.instagram.com/_dpeluola",
};

export const CONTACT_INFO = {
    email: "hello@dpeluola.com",
    label: "Peluola David Adeoluwa",
    shortName: "P.D.A",
    domain: "dpeluola.com",
    websiteUrl: "https://dpeluola.com"
};

/** Public filenames in /public */
export const RESUME_FILES = {
    pdf: "/Peluola_David_Resume.pdf",
    docx: "/Peluola_David_Resume.docx",
} as const;

/** Shown under Selected Work, hiring / freelance signal */
export const PORTFOLIO_HIRE_SUBLINE =
    'Limited concurrent builds, share scope and deadline for an honest fit check.';

/** Shown on the contact form, no server-side storage */
export const CONTACT_PRIVACY_NOTE =
    'This form only opens your email app with your message; nothing you type is saved on this website.';
