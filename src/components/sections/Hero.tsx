import React from "react";
import { ArrowRight, CreditCard, LayoutGrid, Star } from "lucide-react";
import { WindowBar } from "../common/ui";
import { FEATURED, MORE_BUILDS } from "../../config/content";
import { GOOGLE_REVIEWS } from "../../config/constants";

/** Real client stores, front to back. Screenshots show the public, logged-out pages. */
const FRONT = {
  host: "titanforge.art",
  src: "/images/work/titan-forge.webp",
  srcSet: "/images/work/titan-forge-640.webp 640w, /images/work/titan-forge.webp 1200w",
  // 80% of the figure: about half the container on desktop, full width below lg
  sizes: "(min-width: 1536px) 520px, (min-width: 1024px) 40vw, (min-width: 640px) 480px, 80vw",
  alt: "Titan Forge online store homepage",
};
const BACK = {
  host: "hijoluxwatches.com",
  src: "/videos/work/hijolux-poster.webp",
  srcSet: "/videos/work/hijolux-poster-640.webp 640w, /videos/work/hijolux-poster.webp 1200w",
  sizes: "(min-width: 1536px) 480px, (min-width: 1024px) 37vw, (min-width: 640px) 440px, 74vw",
  alt: "Hijo Lux Watches online store homepage",
};
const PHONE = {
  src: "/images/hero/titan-forge-phone.webp",
  srcSet: "/images/hero/titan-forge-phone-240.webp 240w, /images/hero/titan-forge-phone.webp 420w",
  sizes: "(min-width: 1536px) 160px, (min-width: 1024px) 12vw, 24vw",
  alt: "Titan Forge store on a phone",
};

const Hero: React.FC = () => {
  const sites = FEATURED.length + MORE_BUILDS.length;

  // Every claim here is checked against the live sites and code (see config/content.ts notes).
  const proof = [
    {
      Icon: Star,
      text: (
        <a href="#reviews" className="hover:text-ink">
          <span className="text-ink">{GOOGLE_REVIEWS.rating}</span> from{" "}
          {GOOGLE_REVIEWS.count} Google reviews
        </a>
      ),
      iconClass: "fill-warn text-warn",
    },
    {
      Icon: LayoutGrid,
      text: (
        <span>
          <span className="text-ink">{sites}</span> sites and apps shipped
        </span>
      ),
      iconClass: "text-accent",
    },
    {
      Icon: CreditCard,
      text: <span>Card, crypto and WhatsApp checkout</span>,
      iconClass: "text-accent",
    },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-20 pt-32 sm:pt-40 md:pb-28 lg:pb-32 lg:pt-44"
    >
      <div className="container-site grid items-center gap-14 md:gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
          <p className="hero-rise inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface px-3 py-1.5 text-[13px] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            Available for new projects
          </p>

          <h1 id="hero-title" className="hero-rise [animation-delay:50ms] mt-7 max-w-[16ch] bg-gradient-to-b from-white to-white/65 bg-clip-text text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.035em] text-transparent lg:text-[clamp(2.75rem,4.3vw,4.5rem)]"
          >
            I build online stores and web apps that sell.
          </h1>

          <p className="hero-rise [animation-delay:120ms] mt-6 max-w-[54ch] text-[17px] leading-relaxed text-muted"
          >
            I&apos;m David Peluola, a full-stack developer in Nigeria. Fast
            stores, landing pages and web apps your team can update themselves,
            plus open-source privacy tools for crypto.
          </p>

          <div className="hero-rise [animation-delay:180ms] mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a href="#contact" className="btn-primary">
              Start a project <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#work" className="btn-secondary">
              See client work
            </a>
          </div>

          <ul className="hero-rise [animation-delay:240ms] mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[14px] text-muted lg:justify-start"
          >
            {proof.map(({ Icon, text, iconClass }, i) => (
              <li key={i} className="inline-flex items-center gap-2">
                <Icon className={`h-4 w-4 shrink-0 ${iconClass}`} aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-[600px] lg:col-span-6 lg:max-w-none">
          <div aria-hidden className="glow glow-drift h-[70%] w-[80%]" />
          <div className="relative pb-[9%] pt-[34%]">
            {/* Back: Hijo Lux */}
            <div className="hero-fade-rise [animation-delay:300ms] frame absolute left-0 top-0 w-[74%]"
            >
              <WindowBar label={BACK.host} />
              <img
                src={BACK.src}
                srcSet={BACK.srcSet}
                sizes={BACK.sizes}
                alt={BACK.alt}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </div>

            {/* Front: Titan Forge (rise only, no fade, so it paints straight away; it is the LCP image on desktop) */}
            <div className="hero-rise [animation-delay:150ms] frame relative ml-auto w-[80%] shadow-2xl shadow-black/60"
            >
              <WindowBar label={FRONT.host} />
              <img
                src={FRONT.src}
                srcSet={FRONT.srcSet}
                sizes={FRONT.sizes}
                alt={FRONT.alt}
                width={1200}
                height={750}
                decoding="async"
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </div>

            {/* Phone: Titan Forge mobile */}
            <div className="hero-fade-rise [animation-delay:450ms] absolute bottom-0 left-[3%] w-[24%] rounded-[1.4rem] border border-line-2 bg-black p-[3px] shadow-2xl shadow-black/70 sm:rounded-[1.75rem] sm:p-1"
            >
              <img
                src={PHONE.src}
                srcSet={PHONE.srcSet}
                sizes={PHONE.sizes}
                alt={PHONE.alt}
                width={420}
                height={910}
                loading="lazy"
                decoding="async"
                className="block w-full rounded-[1.2rem] sm:rounded-[1.5rem]"
              />
            </div>
          </div>
          <figcaption className="mt-5 text-center text-[13px] text-faint lg:text-left">
            Live stores I built: Titan Forge (US) and Hijo Lux Watches.
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
