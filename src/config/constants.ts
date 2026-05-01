export const PROFILE_IMAGE = "/profile.jpg";

export const NAV_ITEMS = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Resume', href: '#resume' },
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

/** Shown under Selected Work — hiring / freelance signal */
export const PORTFOLIO_HIRE_SUBLINE =
    'I usually reply within 48 hours. I keep a limited slate of concurrent builds so timelines stay realistic—tell me what you need and we’ll scope it.';

/** Shown on the contact form — no server-side storage */
export const CONTACT_PRIVACY_NOTE =
    'This form only opens your email app with your message; nothing you type is saved on this website.';
