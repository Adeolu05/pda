import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import {
  FEATURED,
  MORE_BUILDS,
  type FeaturedProject,
} from "../../config/content";
import { ExternalLink, Reveal, SectionHeader, WindowBar } from "../common/ui";

/** Plays only near the viewport; poster only for reduced motion or Save-Data. */
const PreviewVideo: React.FC<{ project: FeaturedProject }> = ({ project }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    setAllowMotion(!reduce && !saveData);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !allowMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => undefined);
        else el.pause();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [allowMotion]);

  if (!project.video || !allowMotion) {
    return (
      <img
        src={project.video?.poster ?? project.img}
        alt={`${project.title} website`}
        width={1200}
        height={750}
        loading="lazy"
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    );
  }

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={project.video.poster}
      aria-label={`Scrolling preview of the ${project.title} website`}
      className="block aspect-[16/10] w-full object-cover object-top"
    >
      <source src={project.video.src} type="video/mp4" />
    </video>
  );
};

const FeaturedCard: React.FC<{ project: FeaturedProject; delay: number }> = ({
  project,
  delay,
}) => (
  <Reveal delay={delay} className="flex">
    <article className="card flex w-full flex-col overflow-hidden">
      <div className="border-b border-line">
        <WindowBar label={new URL(project.link).host} />
        <PreviewVideo project={project} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-faint">
          {project.kind}
        </p>
        <h3 className="mt-2 text-[20px] font-medium tracking-[-0.015em] text-ink">
          {project.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          {project.desc}
        </p>

        {project.quote && (
          <figure className="mt-5 rounded-lg border border-line bg-raised/60 px-4 py-3">
            <blockquote className="text-[14px] leading-relaxed text-ink">
              &ldquo;{project.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-2 font-mono text-[11.5px] text-faint">
              {project.quote.name}, {project.quote.source}
            </figcaption>
          </figure>
        )}

        {project.caseStudy && (
          <details className="group mt-5 rounded-lg border border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[14px] text-ink [&::-webkit-details-marker]:hidden">
              How it was built
              <ChevronDown
                className="h-4 w-4 text-faint transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <dl className="space-y-4 border-t border-line px-4 py-4 text-[14px] leading-relaxed">
              {(["problem", "solution", "outcome"] as const).map((k) => (
                <div key={k}>
                  <dt className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-faint">
                    {k}
                  </dt>
                  <dd className="mt-1 text-muted">{project.caseStudy![k]}</dd>
                </div>
              ))}
              {project.caseStudy.metric && (
                <div className="flex items-baseline gap-3 rounded-md bg-raised px-3 py-2">
                  <dd className="font-mono text-[20px] text-success">
                    {project.caseStudy.metric.value}
                  </dd>
                  <dt className="text-[13px] text-muted">
                    {project.caseStudy.metric.label}
                  </dt>
                </div>
              )}
            </dl>
          </details>
        )}

        <div className="mt-auto pt-6">
          <ExternalLink
            href={project.link}
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-accent"
          >
            Visit live site <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ExternalLink>
        </div>
      </div>
    </article>
  </Reveal>
);

/** Full-width case study for the lead project: switchable screens plus the story, all visible. */
const LeadCaseStudy: React.FC<{ project: FeaturedProject }> = ({ project }) => {
  const screens = project.screens ?? [];
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = screens[active];
  const cs = project.caseStudy;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next =
      e.key === "ArrowRight"
        ? (i + 1) % screens.length
        : e.key === "ArrowLeft"
          ? (i - 1 + screens.length) % screens.length
          : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Reveal>
      <article aria-labelledby="lead-title" className="card overflow-hidden">
        <div className="lg:grid lg:grid-cols-12">
          <div className="border-b border-line lg:col-span-7 lg:border-b-0 lg:border-r">
            <WindowBar label={new URL(project.link).host} />
            {current && (
              <div
                role="tabpanel"
                id="lead-panel"
                aria-labelledby={`lead-tab-${active}`}
              >
                <img
                  key={current.src}
                  src={current.src}
                  srcSet={`${current.src.replace(".webp", "-640.webp")} 640w, ${current.src} 1200w`}
                  sizes="(min-width: 1536px) 760px, (min-width: 1024px) 56vw, 100vw"
                  alt={current.alt}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[16/10] w-full object-cover object-top"
                />
              </div>
            )}
            <div
              role="tablist"
              aria-label={`${project.title} screens`}
              className="grid grid-cols-4 gap-2 border-t border-line p-3"
            >
              {screens.map((sc, i) => {
                const on = i === active;
                return (
                  <button
                    key={sc.label}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`lead-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="lead-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`group rounded-lg border p-1.5 text-left transition-colors ${
                      on
                        ? "border-accent/60 bg-raised"
                        : "border-line hover:border-line-2 hover:bg-raised/60"
                    }`}
                  >
                    <img
                      src={sc.thumb}
                      alt=""
                      width={320}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      className={`block aspect-[16/10] w-full rounded-md object-cover object-top transition-opacity ${on ? "" : "opacity-70 group-hover:opacity-100"}`}
                    />
                    <span
                      className={`mt-1.5 block truncate text-[11px] sm:px-0.5 sm:text-[12px] ${on ? "text-ink" : "text-muted"}`}
                    >
                      {sc.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:col-span-5">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-faint">
              {project.kind}
            </p>
            <h3
              id="lead-title"
              className="mt-2 text-[26px] font-medium tracking-[-0.02em] text-ink"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
              {project.desc}
            </p>

            {cs?.metric && (
              <div className="mt-6 flex items-baseline gap-3 rounded-lg border border-line bg-raised/60 px-4 py-3">
                <span className="text-[28px] font-medium tracking-[-0.02em] text-success">
                  {cs.metric.value}
                </span>
                <span className="text-[14px] text-muted">
                  {cs.metric.label}
                </span>
              </div>
            )}

            {project.highlights && (
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-[14px] leading-snug text-ink"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      aria-hidden
                    />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-7">
              <ExternalLink href={project.link} className="btn-primary">
                Visit {new URL(project.link).host}{" "}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </ExternalLink>
            </div>
          </div>
        </div>

        {cs && (
          <dl className="grid gap-6 border-t border-line p-6 text-[14.5px] leading-relaxed sm:p-8 md:grid-cols-3 md:gap-8">
            {(["problem", "solution", "outcome"] as const).map((k) => (
              <div key={k}>
                <dt className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-faint">
                  {k}
                </dt>
                <dd className="mt-2 text-muted">{cs[k]}</dd>
              </div>
            ))}
          </dl>
        )}
      </article>
    </Reveal>
  );
};

const INITIAL = 6;

const Work: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const builds = showAll ? MORE_BUILDS : MORE_BUILDS.slice(0, INITIAL);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="border-t border-line py-16 sm:py-20 md:py-28"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeader
            id="work-title"
            eyebrow="Client work"
            title="Sites that sell, for real businesses."
          >
            Every project below is live. Open any of them and judge for yourself.
          </SectionHeader>
        </Reveal>

        <div className="mt-14">
          <LeadCaseStudy project={FEATURED[0]} />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {FEATURED.slice(1).map((p, i) => (
            <FeaturedCard key={p.title} project={p} delay={i * 0.06} />
          ))}
        </div>

        <div className="mt-20">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-[18px] font-medium text-ink">More builds</h3>
            <span className="font-mono text-[12px] text-faint">
              {MORE_BUILDS.length} projects
            </span>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {builds.map((b) => (
              <li key={b.title} className="min-w-0">
                <ExternalLink
                  href={b.link}
                  className="card card-hover group flex h-full items-center gap-4 p-3"
                >
                  <img
                    src={b.img.replace("/images/work/", "/images/work/thumbs/")}
                    alt=""
                    width={112}
                    height={72}
                    loading="lazy"
                    decoding="async"
                    className="h-[56px] w-[88px] shrink-0 rounded-md min-[380px]:h-[72px] min-[380px]:w-[112px] border border-line object-cover object-top"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 text-[15px] font-medium text-ink">
                      <span className="truncate">{b.title}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 text-faint transition-colors group-hover:text-accent"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                      {b.kind}
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
          {MORE_BUILDS.length > INITIAL && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="btn-secondary"
                aria-expanded={showAll}
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? "Show fewer" : `Show all ${MORE_BUILDS.length}`}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Work;
