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
    /** Real screenshot of the product, or omitted when the card renders its own preview. */
    shot?: { src: string; alt: string };
}

export const TOOLS: Tool[] = [
    {
        slug: 'canishield',
        name: 'Can I Shield?',
        tagline: 'Can I send shielded ZEC to this service?',
        summary:
            'A public registry of which Zcash wallets and exchanges really support shielded withdrawals. Every result carries proof anyone can re-check.',
        facts: [
            '40+ wallets and exchanges tracked',
            'On-chain tests with published viewing keys',
            'Live ZEC deposit and withdrawal status from 8 exchanges, every 5 minutes',
        ],
        stack: ['Next.js', 'Postgres', 'Railway workers', 'Zcash'],
        badge: 'Live',
        live: 'https://canishield.vercel.app',
        repo: 'https://github.com/Adeolu05/canishield',
    },
    {
        slug: 'drainproof',
        name: 'Drainproof',
        tagline: 'Is your AI agent drainproof?',
        summary:
            'CI that red-teams an AI agent’s money rules on every pull request, against the policy engine and an on-chain NEAR vault. The PR fails if a change would let the agent be drained.',
        facts: ['40 attack scenarios per run', 'Ships as a GitHub Action', 'Vault refuses unlisted payees on NEAR testnet'],
        stack: ['TypeScript', 'Rust (NEAR)', 'GitHub Actions'],
        badge: 'NEAR HACKATHON 2026',
        live: 'https://drainproof-lemon.vercel.app',
        repo: 'https://github.com/Adeolu05/drainproof',
        shot: { src: '/images/tools/drainproof.webp', alt: 'Drainproof dashboard overview showing test runs and recent findings' },
    },
    {
        slug: 'am-i-linkable',
        name: 'Am I Linkable?',
        tagline: 'Checked here. Sent nowhere.',
        summary:
            'Before you move ZEC out of a shielded pool, see whether the amount could be matched to a recent deposit. The check runs in your browser and sends nothing.',
        facts: ['Runs entirely client-side', 'Built on a live chain indexer', 'ZECATHON entry, Core & Tooling'],
        stack: ['TypeScript', 'Chain indexer', 'Zcash'],
        badge: 'ZECATHON 2026',
        live: 'https://am-i-linkable.vercel.app',
        repo: 'https://github.com/Adeolu05/am-i-linkable',
        shot: { src: '/images/tools/am-i-linkable.webp', alt: 'Am I Linkable home page with an amount check and live stats' },
    },
];

/** Verified on canishield.vercel.app (Nov 2026). Shown in the Can I Shield card preview. */
export const CANISHIELD_PREVIEW = [
    { name: 'Trust Wallet', state: 'Transparent only', tone: 'warn' as const },
    { name: 'Binance', state: 'Unified address rejected', tone: 'danger' as const },
    { name: 'Bitget', state: 'Unified address rejected', tone: 'danger' as const },
    { name: 'MEXC', state: 'Unified address rejected', tone: 'danger' as const },
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
}

export const FEATURED: FeaturedProject[] = [
    {
        title: 'Hijo Lux Watches',
        kind: 'Luxury e-commerce',
        desc: 'Luxury watch catalogue with WhatsApp checkout. Stock and prices live in the CMS, so the team updates them without a developer.',
        link: 'https://hijoluxwatches.com',
        img: '/images/work/hijo-hijolux.webp',
        video: { src: '/videos/work/hijolux.mp4', poster: '/videos/work/hijolux-poster.webp' },
        stack: ['Next.js', 'TypeScript', 'Sanity CMS', 'WhatsApp'],
        caseStudy: {
            problem:
                'Hijo Lux sells authenticated luxury watches, many priced in six figures, to buyers across Nigeria and the UAE. Buyers needed reasons to trust the dealer before sending a message, and the team needed to change stock and prices often without waiting on a developer.',
            solution:
                'A Next.js storefront with an editorial layout, stock and pricing managed in Sanity CMS, and WhatsApp as the checkout so every enquiry becomes a direct conversation. Trust signals sit on the homepage: the brand registration certificate, authentication, clear pricing and delivery terms.',
            outcome:
                'The team updates inventory, prices and featured pieces in the CMS themselves, and buyers go from a product to a WhatsApp chat in one tap.',
        },
    },
    {
        title: 'PrintNest',
        kind: 'Product landing page',
        desc: 'Explains a new product to artists in one scroll, so the right people try it instead of bouncing.',
        link: 'https://printnest.vercel.app',
        img: '/images/work/printnest.webp',
        video: { src: '/videos/work/printnest.mp4', poster: '/videos/work/printnest-poster.webp' },
        stack: ['React', 'TypeScript', 'Tailwind CSS'],
        caseStudy: {
            problem:
                'PrintNest turns an artist’s images into a shareable print store. The landing page had to explain a new product to non-technical artists quickly enough that they would try it instead of bouncing.',
            solution:
                'A single-scroll React page that shows the product working: a live storefront mockup, a three-step how-it-works, a before/after of the AI copy tool and a no-signup demo store. Built mobile-first because artists arrive from Instagram, TikTok and WhatsApp.',
            outcome: 'The workflow is clear in one scroll, so artists can judge the fit before signing up.',
            metric: { value: '96', label: 'Lighthouse mobile performance (Sept 2026)' },
        },
    },
    {
        title: 'BCCS Hub',
        kind: 'Web3 community site',
        desc: 'A plain-language front door for a Web3 community, built for newcomers who are wary of crypto hype.',
        link: 'https://bccshub.com',
        img: '/images/work/bccs-hub.webp',
        video: { src: '/videos/work/bccshub.mp4', poster: '/videos/work/bccshub-poster.webp' },
        stack: ['React', 'TypeScript', 'Tailwind CSS'],
        caseStudy: {
            problem:
                'Blue Collar Crypto Society introduces tradespeople and working-class creators to Web3. Most of that audience is new to crypto and wary of hype, so the site had to feel clear and trustworthy rather than overwhelming.',
            solution:
                'A React and TypeScript site organised around plain-language sections (what BCCS is, education over hype, community first) and four clear paths: the 3,333-piece collection, utility and rewards, music on DigiBeatz, and partners.',
            outcome: 'The community’s front door, with a simple hierarchy newcomers can follow instead of a wall of crypto jargon.',
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
        quote:
            'Dave developed two websites for clients of mine, both delivered to a high professional standard. The first was an e-commerce platform for a watch retailer… He was consistently professional, communicative, and delivered on time.',
        name: 'Oyewole O.',
        context: 'Referred two client builds',
    },
    {
        quote:
            'Amazing web developer. Very talented… Was able to accomplish every task I gave him and deliver a final product that was highly polished. Everyone who visited my website has nothing but good things to say.',
        name: 'G Solid Prime',
        context: 'Google Local Guide',
    },
    {
        quote:
            'A Very professional, patient website developer. He pays attention to details and grasps ideas shared quickly… I would use his services over and over again.',
        name: 'Naomi D.',
    },
    {
        quote: 'One of the best out there, very composed with attention to details. I recommend any day.',
        name: 'Hijo',
        context: 'Hijo Lux Watches',
    },
    {
        quote: 'He made my portfolio and I must admit, it was a very clean job...love it!',
        name: 'Olasubomi A.',
        context: 'Portfolio site',
    },
    {
        quote: 'He is faithful and diligent in web development… I hereby recommend him for who ever needs his service.',
        name: 'Adeyemi A.',
        context: 'Church website',
    },
];

export const SERVICES = [
    {
        title: 'Web apps',
        body: 'Full-stack apps with auth, dashboards and a real database, built to be maintained.',
        stack: 'Next.js · TypeScript · Postgres',
    },
    {
        title: 'E-commerce',
        body: 'Stores your team can run: products, prices and orders in a CMS or WooCommerce, checkout that converts.',
        stack: 'Next.js · Sanity · WooCommerce',
    },
    {
        title: 'Landing pages',
        body: 'One page that explains the offer fast and loads fast. Built to turn visitors into enquiries.',
        stack: 'React · Tailwind · Vercel',
    },
    {
        title: 'Crypto tooling',
        body: 'Wallet UX, Telegram bots, dashboards and on-chain checks for Zcash, NEAR and Solana teams.',
        stack: 'TypeScript · Rust · Node',
    },
];

export const PROCESS = [
    { step: '01', title: 'Discover', body: 'I learn the brand, the audience and the one action the site needs visitors to take.' },
    { step: '02', title: 'Design', body: 'A clear direction for layout, copy and user flow, agreed before the build.' },
    { step: '03', title: 'Build', body: 'Responsive, fast and maintainable, from interface to backend.' },
    { step: '04', title: 'Launch', body: 'Deployed, tested and refined so it is ready for customers.' },
];

export const STACK = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Postgres', 'Python', 'Rust (NEAR)', 'Tailwind', 'Sanity', 'WooCommerce', 'Vercel', 'Railway'];
