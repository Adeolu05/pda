import React from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { REVIEWS } from '../../config/content';
import { GOOGLE_REVIEWS } from '../../config/constants';
import { ExternalLink, Reveal, SectionHeader } from '../common/ui';

const Stars: React.FC<{ size?: string }> = ({ size = 'h-3.5 w-3.5' }) => (
    <span className="flex gap-0.5 text-warn" role="img" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`${size} fill-current`} aria-hidden />
        ))}
    </span>
);

const Reviews: React.FC = () => (
    <section id="reviews" aria-labelledby="reviews-title" className="border-t border-line py-16 sm:py-20 md:py-28">
        <div className="container-site">
            <Reveal>
                <SectionHeader id="reviews-title" eyebrow="Reviews" title="What clients say.">
                    <p>Unedited excerpts from my Google Business Profile.</p>
                    <ExternalLink
                        href={GOOGLE_REVIEWS.url}
                        className="mt-4 inline-flex items-center gap-3 rounded-lg border border-line-2 bg-surface px-3 py-2 text-[14px] text-ink hover:bg-raised"
                    >
                        <Stars />
                        <span>
                            <span className="font-medium">{GOOGLE_REVIEWS.rating}</span> from {GOOGLE_REVIEWS.count} reviews
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-faint" aria-hidden />
                    </ExternalLink>
                </SectionHeader>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
                {REVIEWS.map((r, i) => (
                    <Reveal key={r.name} delay={i * 0.06} className="flex">
                        <figure className="card flex w-full flex-col p-6">
                            <Stars />
                            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">&ldquo;{r.quote}&rdquo;</blockquote>
                            <figcaption className="mt-5 border-t border-line pt-4">
                                <p className="text-[14px] font-medium text-ink">{r.name}</p>
                                <p className="font-mono text-[11.5px] text-faint">{r.context ?? 'Google review'}</p>
                            </figcaption>
                        </figure>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default Reviews;
