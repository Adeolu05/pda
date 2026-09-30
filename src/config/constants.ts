export const PROFILE_IMAGE = "/profile.webp";
/** Hero portrait renders at ~297-513 CSS px (frame width x 1.35 zoom); keep in sync with the preload in index.html */
export const PROFILE_SRCSET = "/profile-480.webp 480w, /profile-800.webp 800w, /profile.webp 1400w";
export const PROFILE_SIZES = "(min-width: 1024px) 513px, (min-width: 768px) 486px, (min-width: 640px) 378px, 297px";

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
    websiteUrl: "https://www.dpeluola.com",
    /** Cal.com discovery call, offered next to the contact form */
    bookingUrl: "https://cal.com/dpeluola/discovery",
};

/** Google Business Profile, source of the testimonials in ProofSection */
export const GOOGLE_REVIEWS = {
    url: "https://share.google/4c2Ccak3IPZaaCQxN",
    rating: "5.0",
    count: 8,
};

/** Public filenames in /public */
export const RESUME_FILES = {
    pdf: "/Peluola_David_Resume.pdf",
    docx: "/Peluola_David_Resume.docx",
} as const;

/** Shown under Selected Work, hiring / freelance signal */
export const PORTFOLIO_HIRE_SUBLINE =
    'I take on a few builds at a time. Share scope and deadline for an honest fit check.';

/** Shown on the contact form, no server-side storage */
export const CONTACT_PRIVACY_NOTE =
    'Your brief is emailed straight to my inbox; nothing you type is saved in a database on this website.';
