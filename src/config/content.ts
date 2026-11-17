/**
 * All site copy and project data in one place.
 * Rule: only verifiable facts. Every number here was checked against its live source.
 */

export interface Tool {
    slug: string;
    name: string;
    tagline: string;
    summary: string;
    facts: string[];
    stack: string[];
    badge: string;
    live: string;
    repo: string;
    /** Where the tool also runs inside the ZecHub wiki, under ZecHub's own name for it. */
    zechub?: { href: string; name: string };
    /** Real screenshot of the product, or omitted when the card renders its own preview. */
    shot?: { src: string; alt: string; width?: number; height?: number; srcSet?: boolean };
}

export const TOOLS: Tool[] = [
    {
        slug: 'canishield',
        name: 'Can I Shield?',
        tagline: 'Can I send shielded ZEC to this service?',
        summary: 'Which wallets and exchanges really support shielded ZEC, with proof for every result.',
        facts: [
            '40+ wallets and exchanges tracked',
            'On-chain tests with published viewing keys',
            'Live ZEC deposit and withdrawal status from 8 exchanges, every 5 minutes',
        ],
        stack: ['Next.js', 'Postgres', 'Railway workers', 'Zcash'],
        badge: 'Live',
        live: 'https://canishield.vercel.app',
        repo: 'https://github.com/Adeolu05/canishield',
        zechub: { href: 'https://zechub.wiki/tools?tool=deposit-check', name: 'Deposit Check' },
    },
    {
        slug: 'drainproof',
        name: 'Drainproof',
        tagline: 'Is your AI agent drainproof?',
        summary: 'CI that red-teams an AI agent’s money rules on every pull request.',
        facts: ['40 attack scenarios per run', 'Ships as a GitHub Action', 'Vault refuses unlisted payees on NEAR testnet'],
        stack: ['TypeScript', 'Rust (NEAR)', 'GitHub Actions'],
        badge: 'NEAR HACKATHON 2026',
        live: 'https://drainproof-lemon.vercel.app',
        repo: 'https://github.com/Adeolu05/drainproof',
        shot: { src: '/images/tools/drainproof.webp', alt: 'Drainproof dashboard overview showing test runs and recent findings', srcSet: true },
    },
    {
        slug: 'am-i-linkable',
        name: 'Am I Linkable?',
        tagline: 'Checked here. Sent nowhere.',
        summary: 'Checks if a ZEC amount links back to a recent deposit, right in your browser.',
        facts: ['Runs entirely client-side', 'Built on a live chain indexer', 'ZECATHON entry, Core & Tooling'],
        stack: ['TypeScript', 'Chain indexer', 'Zcash'],
        badge: 'ZECATHON 2026',
        live: 'https://am-i-linkable.vercel.app',
        repo: 'https://github.com/Adeolu05/am-i-linkable',
        zechub: { href: 'https://zechub.wiki/tools?tool=linkability', name: 'Linkability Check' },
        shot: { src: '/images/tools/am-i-linkable.webp', alt: 'Am I Linkable home page with an amount check and live stats', srcSet: true },
    },
    {
        slug: 'noid-wallet',
        name: 'NOID Wallet',
        tagline: 'Your keys never leave the phone.',
        summary: 'Android wallet for Parano1d where every send is proven on the phone. Built with Primal (@Solid_Primal).',
        facts: [
            'Gift cards and payment requests as links or QR codes',
            'Look-alike address warnings and values in 41 currencies',
            'Open source (Apache-2.0), launched 21 Oct 2026',
        ],
        stack: ['React Native', 'Expo', 'Rust core', 'TypeScript API'],
        badge: 'Live on Android',
        live: 'https://noidusa.com',
        repo: 'https://github.com/noidwallet/noid-wallet',
        shot: {
            src: '/images/tools/noid-wallet.webp',
            alt: 'NOID wallet share card showing the home screen with balance, send, receive, scan and gift buttons',
            width: 1200,
            height: 630,
        },
    },
];

/** Re-verified on canishield.vercel.app/services/* on 17 Nov 2026 ("Rejects unified addresses", "Transparent only"). */
export const CANISHIELD_PREVIEW = [
    { name: 'Trust Wallet', state: 'Transparent only', tone: 'warn' as const },
    { name: 'Binance', state: 'Rejects unified', tone: 'danger' as const },
    { name: 'Bitget', state: 'Rejects unified', tone: 'danger' as const },
    { name: 'MEXC', state: 'Rejects unified', tone: 'danger' as const },
];

export interface CaseStudy {
    problem: string;
    solution: string;
    outcome: string;
    metric?: { value: string; label: string };
}

export interface FeaturedProject {
    title: string;
    kind: string;
    desc: string;
    link: string;
    img: string;
    video?: { src: string; poster: string };
    stack: string[];
    caseStudy?: CaseStudy;
    /** Screens for the full-width case study (first project only). Each has -640 and thumb- variants. */
    screens?: { label: string; src: string; thumb: string; alt: string }[];
    /** Short feature list for the lead case study, each checked in the project's code */
    highlights?: string[];
    /** Verbatim client review shown on the card */
    quote?: { text: string; name: string; source: string };
}

export const FEATURED: FeaturedProject[] = [
    {
        title: 'Titan Forge',
        kind: 'Headless e-commerce · US LLC',
        desc: 'Online store for a US metal art brand. I am the only developer.',
        link: 'https://titanforge.art',
        img: '/images/work/titan-forge.webp',
        stack: ['Next.js', 'TypeScript', 'WooCommerce + GraphQL', 'Stripe'],
        // Verified in the Titan Forge code: Stripe + NOWPayments routes, FedEx rates API, Google OAuth synced to WordPress, WooCommerce coupons.
        highlights: ['Card and crypto checkout', 'Live FedEx shipping rates', 'Google sign-in, synced to WooCommerce', 'Affiliate discount codes'],
        // Public pages, logged out. Checkout personal details and the coupon code are blurred.
        screens: [
            { label: 'Home', src: '/images/work/titan-forge.webp', thumb: '/images/work/titan-forge/thumb-home.webp', alt: 'Titan Forge homepage' },
            {
                label: 'Catalogue',
                src: '/images/work/titan-forge/catalogue.webp',
                thumb: '/images/work/titan-forge/thumb-catalogue.webp',
                alt: 'All products page listing 251 metal art panels, with filters for category, price, size and finish',
            },
            {
                label: 'Cart',
                src: '/images/work/titan-forge/cart.webp',
                thumb: '/images/work/titan-forge/thumb-cart.webp',
                alt: 'Cart drawer with a free shipping notice, a reference number on each panel and the returns policy',
            },
            {
                label: 'Checkout',
                src: '/images/work/titan-forge/checkout.webp',
                thumb: '/images/work/titan-forge/thumb-checkout.webp',
                alt: 'Two-step checkout with an order summary and a discount code applied. Personal details are blurred',
            },
        ],
        caseStudy: {
            problem: 'A US art brand needed a fast store its team could run without a developer.',
            solution: 'Headless Next.js on WooCommerce: the team edits products in WordPress, buyers get a fast store.',
            outcome: 'Launched on 14 Aug 2026, on the client’s schedule. I am retained for new features.',
            metric: { value: '250+', label: 'panels across 8 collections' },
        },
    },
    {
        title: 'Hijo Lux Watches',
        kind: 'Luxury e-commerce',
        desc: 'Luxury watch store with WhatsApp checkout. The team edits stock and prices in the CMS.',
        link: 'https://hijoluxwatches.com',
        img: '/images/work/hijo-hijolux.webp',
        video: { src: '/videos/work/hijolux.mp4', poster: '/videos/work/hijolux-poster.webp' },
        stack: ['Next.js', 'TypeScript', 'Sanity CMS', 'WhatsApp'],
        quote: {
            text: 'One of the best out there, very composed with attention to details. I recommend any day.',
            name: 'Hijo Lux Watches',
            source: 'Google review',
        },
        caseStudy: {
            problem: 'Buyers spending six figures need to trust the dealer, and stock changes often.',
            solution: 'A Next.js store with stock and prices in Sanity, trust signals up front, and WhatsApp as checkout.',
            outcome: 'The team runs the catalogue themselves, and every order becomes a WhatsApp chat.',
        },
    },
    {
        title: 'BCCS Hub',
        kind: 'Web3 community site',
        desc: 'A plain-language home for a Web3 community, made for newcomers wary of crypto hype.',
        link: 'https://bccshub.com',
        img: '/images/work/bccs-hub.webp',
        video: { src: '/videos/work/bccshub.mp4', poster: '/videos/work/bccshub-poster.webp' },
        stack: ['React', 'TypeScript', 'Tailwind CSS'],
        caseStudy: {
            problem: 'Tradespeople new to crypto needed a site that felt clear, not overwhelming.',
            solution: 'Plain-language sections and four clear paths: the collection, rewards, music and partners.',
            outcome: 'A simple front door newcomers can follow, without the jargon.',
        },
    },
];

export interface Build {
    title: string;
    kind: string;
    desc: string;
    link: string;
    img: string;
}

export const MORE_BUILDS: Build[] = [
    { title: 'PrintNest', kind: 'Product landing page', desc: 'Explains a print-store product to artists in one scroll, with a no-signup demo store.', link: 'https://printnest.vercel.app', img: '/images/work/printnest.webp' },
    { title: 'Chef Olamide', kind: 'Portfolio', desc: 'Culinary portfolio for a UK-based Chef de Partie.', link: 'https://chefolamide.com', img: '/images/work/chef-olamide.webp' },
    { title: 'RCCG Glorious Premier', kind: 'Church website', desc: 'Service times, ministries, events, giving details and a prayer-request form.', link: 'https://ogp12.vercel.app', img: '/images/work/ogp12-church.webp' },
    { title: 'Grok Freedom', kind: 'Web3 site', desc: 'Official site for the Grok Freedom community.', link: 'https://grokfreedom.com', img: '/images/work/grok-freedom.webp' },
    { title: 'BitGuess', kind: 'Web3 dApp', desc: 'Prediction game on Alephium with wallet connect and on-chain settlement.', link: 'https://bitguess.vercel.app', img: '/images/work/bitguess.webp' },
    { title: "Tomijoke's Cakes", kind: 'Small business', desc: 'Bakery storefront with one-tap WhatsApp ordering.', link: 'https://tomijoke-cakes.vercel.app', img: '/images/work/tomijoke.webp' },
    { title: 'Oluwaseun Akinola', kind: 'Personal brand', desc: 'Speaker portfolio with an invitation form.', link: 'https://oluwaseunakinola.vercel.app', img: '/images/work/oluwaseun-akinola.webp' },
    { title: 'Inboxx', kind: 'Web platform', desc: 'Paid messaging between fans and creators.', link: 'https://inboxx-ebon.vercel.app', img: '/images/work/inboxx.webp' },
    { title: 'Herdentity', kind: 'Landing page', desc: 'Mentorship and community landing page for women.', link: 'https://herdentity.vercel.app', img: '/images/work/herdentity.webp' },
    { title: '24/01 Cakes', kind: 'Small business', desc: 'One-page site for a bespoke patisserie with consultation booking.', link: 'https://24-01.vercel.app', img: '/images/work/2401-cakes.webp' },
    { title: 'Celebration House', kind: 'Church website', desc: 'Calm, clear site for a church community.', link: 'https://celebration-house.vercel.app', img: '/images/work/celebration-house.webp' },
    { title: 'Live Stream AI Avatar', kind: 'AI tool', desc: 'AI avatar that answers live-stream comments in real time.', link: 'https://livestream-ai-avatar.vercel.app', img: '/images/work/livestream-ai-avatar.webp' },
    { title: 'LMS PDF Downloader', kind: 'Automation', desc: 'Grabs course PDFs from LMS pages and sorts them by week.', link: 'https://lms-pdf-downloader.vercel.app', img: '/images/work/lms-pdf-downloader.webp' },
    { title: 'Jumpa', kind: 'Landing page', desc: 'Marketing homepage for a product launch.', link: 'https://jumpa-homepage.vercel.app', img: '/images/work/jumpa-homepage.webp' },
    { title: 'Dami Olatunji', kind: 'Personal brand', desc: 'Personal brand site built for mobile reading.', link: 'https://damiolatunji.com', img: '/images/work/dami-olatunji.webp' },
    { title: 'Shubby', kind: 'Personal brand', desc: 'Storyteller hub with series and newsletter sign-up.', link: 'https://shubby-eta.vercel.app', img: '/images/work/shuuby.webp' },
    { title: 'Sweet Zoey Bakehouse', kind: 'Small business', desc: 'Bakery site with menu and WhatsApp orders.', link: 'https://sweet-zoey.vercel.app', img: '/images/work/sweet-zoey.webp' },
    { title: "Lara's Confections", kind: 'Small business', desc: 'Confectionery landing with direct WhatsApp checkout.', link: 'https://larascollection.vercel.app', img: '/images/work/lara-collection.webp' },
    { title: "God's Favor Cakes", kind: 'Small business', desc: 'Bakery site with gallery, price guide and live chat.', link: 'https://godsfavour-pi.vercel.app', img: '/images/work/gods-favour.webp' },
    { title: 'OnionLab', kind: 'Telegram bot', desc: 'Alephium market data in Telegram: prices, pools and wallet summaries.', link: 'https://t.me/onionlab_bot', img: '/images/work/onionlab.webp' },
];

/**
 * Verbatim excerpts from 5-star Google reviews (GOOGLE_REVIEWS.url).
 * Keep wording as written; cuts marked with "…". Names shortened to first name + initial.
 */
export const REVIEWS: { quote: string; name: string; context?: string }[] = [
    {
        quote: 'Dave developed two websites for clients of mine, both delivered to a high professional standard.',
        name: 'Oyewole O.',
        context: 'Referred two client builds',
    },
    {
        quote: 'Amazing web developer. Very talented… Everyone who visited my website has nothing but good things to say.',
        name: 'G Solid Prime',
        context: 'Google Local Guide',
    },
    {
        quote: 'A Very professional, patient website developer. He pays attention to details and grasps ideas shared quickly…',
        name: 'Naomi D.',
    },
];

/**
 * E-commerce first. "includes" lists features shipped on real projects:
 * Titan Forge code (Stripe, NOWPayments, FedEx rates API, WooCommerce, accounts, coupons)
 * and the live Hijo Lux site (Sanity CMS, cart that ends in WhatsApp), checked Nov 2026.
 */
export const SERVICES = [
    {
        key: 'ecommerce',
        title: 'E-commerce',
        body: 'Stores your team can run day to day, with the checkout your buyers actually use.',
        stack: 'Next.js · WooCommerce · Sanity · Stripe',
        includes: ['Products and stock you edit yourself', 'Card, crypto or WhatsApp checkout', 'Live shipping rates', 'Customer accounts and discount codes'],
    },
    {
        key: 'webapps',
        title: 'Web apps',
        body: 'Apps with logins, dashboards and a real database.',
        stack: 'Next.js · TypeScript · Postgres',
    },
    {
        key: 'landing',
        title: 'Landing pages',
        body: 'One fast page that turns visitors into enquiries.',
        stack: 'React · Tailwind · Vercel',
    },
    {
        key: 'crypto',
        title: 'Crypto tooling',
        body: 'Wallets, Telegram bots and on-chain checks for Zcash, NEAR and Parano1d.',
        stack: 'TypeScript · Rust · Node',
    },
];

export const PROCESS = [
    { step: '01', title: 'Discover', body: 'Your goals and the one action that matters.' },
    { step: '02', title: 'Design', body: 'Layout and copy, agreed before any code.' },
    { step: '03', title: 'Build', body: 'Fast, responsive and easy to maintain.' },
    { step: '04', title: 'Launch', body: 'Tested, deployed and ready for customers.' },
];

export const STACK = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Postgres', 'Python', 'Rust (NEAR)', 'Tailwind', 'Sanity', 'WooCommerce', 'Vercel', 'Railway'];

/** Verified on dev.to/api/articles?username=dpeluola */
export const WRITING = {
    profile: 'https://dev.to/dpeluola',
    posts: [
        {
            title: 'Can you withdraw shielded ZEC? I tested 4 big services. None can.',
            url: 'https://dev.to/dpeluola/can-you-withdraw-shielded-zec-i-tested-4-big-services-none-can-2jek',
            date: '16 Nov 2026',
            minutes: 2,
        },
    ],
};
