export const PROFILE_IMAGE = "/profile.webp";

/** Matches floating nav on scroll, keep labels short for the pill layout */
export const NAV_ITEMS = [
    { label: 'Work', href: '#work' },
    { label: 'Tools', href: '#tools' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS = {
    linkedIn: "https://www.linkedin.com/in/david-peluola-6b45761b4",
    github: "https://github.com/Adeolu05",
    twitter: "https://x.com/0xdavee_",
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
    pdf: "/David_Peluola_Resume.pdf",
} as const;


/** Shown on the contact form, no server-side storage */
export const CONTACT_PRIVACY_NOTE =
    'Your brief is emailed straight to my inbox; nothing you type is saved in a database on this website.';
