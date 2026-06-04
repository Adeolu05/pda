import { useCallback, useEffect, useRef, useState } from 'react';

const SCROLL_EDGE = 10;

function getProcessSlides(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('[data-process-index]'));
}

/** Centers a slide in the track; requires leading/trailing gutters in the DOM. */
function scrollChildToCenter(container: HTMLElement, index: number, behavior: ScrollBehavior) {
    const slides = getProcessSlides(container);
    const child = slides[index];
    if (!child) return;

    const containerRect = container.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    const targetLeft =
        container.scrollLeft +
        (childRect.left - containerRect.left) +
        childRect.width / 2 -
        containerRect.width / 2;
    const maxLeft = Math.max(0, container.scrollWidth - container.clientWidth);

    container.scrollTo({
        left: Math.max(0, Math.min(targetLeft, maxLeft)),
        behavior,
    });
}

export function useProcessCarousel(slideCount: number, reduceMotion: boolean | null) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [isOverflowing, setIsOverflowing] = useState(true);
    const dragState = useRef({ active: false, startX: 0, startScroll: 0, pointerId: -1 });

    const scrollBehavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';

    const updateScrollMetrics = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;
        const overflow = scrollWidth > clientWidth + SCROLL_EDGE;
        setIsOverflowing(overflow);
        setCanPrev(scrollLeft > SCROLL_EDGE);
        setCanNext(scrollLeft < scrollWidth - clientWidth - SCROLL_EDGE);
    }, []);

    const syncActiveFromScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        const slides = getProcessSlides(el);
        if (slides.length === 0) return;

        const center = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;

        const containerRect = el.getBoundingClientRect();

        slides.forEach((node, i) => {
            const nodeRect = node.getBoundingClientRect();
            const childCenter = el.scrollLeft + (nodeRect.left - containerRect.left) + nodeRect.width / 2;
            const dist = Math.abs(center - childCenter);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });

        setActiveIndex(closest);
    }, []);

    const scrollToIndex = useCallback(
        (index: number) => {
            const el = scrollRef.current;
            if (!el) return;
            const clamped = Math.max(0, Math.min(slideCount - 1, index));
            scrollChildToCenter(el, clamped, scrollBehavior);
            setActiveIndex(clamped);

            if (scrollBehavior === 'smooth') {
                window.setTimeout(syncActiveFromScroll, 420);
            }
        },
        [slideCount, scrollBehavior, syncActiveFromScroll],
    );

    const scrollByDirection = useCallback(
        (dir: -1 | 1) => {
            scrollToIndex(activeIndex + dir);
        },
        [activeIndex, scrollToIndex],
    );

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        updateScrollMetrics();
        syncActiveFromScroll();

        const onScroll = () => {
            window.requestAnimationFrame(() => {
                updateScrollMetrics();
                syncActiveFromScroll();
            });
        };

        el.addEventListener('scroll', onScroll, { passive: true });
        const resizeObserver = new ResizeObserver(() => {
            updateScrollMetrics();
            syncActiveFromScroll();
        });
        resizeObserver.observe(el);
        getProcessSlides(el).forEach((slide) => resizeObserver.observe(slide));

        return () => {
            el.removeEventListener('scroll', onScroll);
            resizeObserver.disconnect();
        };
    }, [updateScrollMetrics, syncActiveFromScroll, slideCount]);

    const onCarouselKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (canPrev) scrollByDirection(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (canNext) scrollByDirection(1);
            } else if (e.key === 'Home') {
                e.preventDefault();
                scrollToIndex(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                scrollToIndex(slideCount - 1);
            }
        },
        [canPrev, canNext, scrollByDirection, scrollToIndex, slideCount],
    );

    const onPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (e.button !== 0 || !isOverflowing) return;
            const el = scrollRef.current;
            if (!el) return;
            dragState.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, pointerId: e.pointerId };
            el.setPointerCapture(e.pointerId);
        },
        [isOverflowing],
    );

    const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragState.current.active) return;
        const el = scrollRef.current;
        if (!el) return;
        el.scrollLeft = dragState.current.startScroll - (e.clientX - dragState.current.startX);
    }, []);

    const onPointerUp = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const el = scrollRef.current;
            if (!el || !dragState.current.active) return;
            dragState.current.active = false;
            if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
            updateScrollMetrics();
            syncActiveFromScroll();
        },
        [updateScrollMetrics, syncActiveFromScroll],
    );

    return {
        scrollRef,
        activeIndex,
        canPrev,
        canNext,
        isOverflowing,
        scrollToIndex,
        scrollByDirection,
        onCarouselKeyDown,
        onPointerDown,
        onPointerMove,
        onPointerUp,
    };
}
