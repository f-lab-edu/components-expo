import { useRef, useState, useEffect, useCallback } from 'react';

interface UseCarouselProps<T> {
  items: T[];
  visibleCount: number;
  scrollCount?: number;
  infinite?: boolean;
  delay?: number;
}

export function useCarousel<T>({
  items,
  visibleCount,
  scrollCount = 1,
  infinite = false,
  delay = 250,
}: UseCarouselProps<T>) {
  const total = items.length;
  const extended = infinite
    ? [...items.slice(-visibleCount), ...items, ...items.slice(0, visibleCount)]
    : [...items];

  const [index, setIndex] = useState(infinite ? visibleCount : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const trackRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const moveTo = useCallback(
    (i: number, withTransition = true) => {
      setIsTransitioning(true);

      if (!trackRef.current || !wrapperRef.current) return;

      const itemWidth = wrapperRef.current.offsetWidth / visibleCount;
      trackRef.current.style.transition = withTransition ? 'transform 0.5s ease' : 'none';
      trackRef.current.style.transform = `translateX(-${itemWidth * i}px)`;

      if (withTransition) {
        setTimeout(() => setIsTransitioning(false), 600);
      }
    },
    [visibleCount]
  );

  useEffect(() => {
    moveTo(index);
  }, [index, moveTo]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (!infinite) return;

    // 무한 캐러셀 인덱스 보정
    if (index === 0) {
      const resetIndex = total;
      setIsResetting(true);
      setIndex(resetIndex);
      requestAnimationFrame(() => {
        moveTo(resetIndex, false);
        setIsResetting(false);
      });
    } else if (index === total + visibleCount) {
      const resetIndex = visibleCount;
      setIsResetting(true);
      setIndex(resetIndex);
      requestAnimationFrame(() => {
        moveTo(resetIndex, false);
        setIsResetting(false);
      });
    }
  };

  const debouncedAction = (action: () => void) => {
    if (isTransitioning || isResetting) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(action, delay);
  };

  const handleNext = () => {
    debouncedAction(() => setIndex((prev) => prev + scrollCount));
  };

  const handlePrev = () => {
    debouncedAction(() => setIndex((prev) => prev - scrollCount));
  };

  const getItemStyle = () => {
    if (!wrapperRef.current) return {};
    const width = wrapperRef.current.offsetWidth / visibleCount;
    return { width: `${width}px` };
  };

  const getTrackStyle = () => {
    return {
      transform: `rotateX(0)`,
      width: `${(extended.length / visibleCount) * 100}%`,
      display: 'flex',
    };
  };

  return {
    items: extended,
    index,
    wrapperRef,
    trackRef,
    handleNext,
    handlePrev,
    bind: {
      onTransitionEnd: handleTransitionEnd,
    },
    itemStyle: getItemStyle(),
    trackStyle: getTrackStyle(),
  };
}
