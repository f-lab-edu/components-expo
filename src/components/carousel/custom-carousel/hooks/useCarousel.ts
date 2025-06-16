import { useRef, useState, useEffect, useCallback } from 'react';

interface UseCarouselProps<T> {
  items: T[];
  visibleCount: number;
  scrollCount?: number;
  infinite?: boolean;
  delay?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  draggable?: boolean;
  swipeable?: boolean;
}

export function useCarousel<T>({
  items,
  visibleCount,
  scrollCount = 1,
  infinite = false,
  delay = 250,
  autoPlay,
  autoPlaySpeed = 3000,
  draggable,
  swipeable,
}: UseCarouselProps<T>) {
  const total = items.length;
  const extended = infinite
    ? [...items.slice(-visibleCount), ...items, ...items.slice(0, visibleCount)]
    : [...items];

  const [index, setIndex] = useState(infinite ? visibleCount : 0);
  /** inifinite scroll 시 transition */
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  /** draggable */
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

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
    if (autoPlay) setInterval(handleNext, autoPlaySpeed);
  }, [autoPlay]);

  useEffect(() => {
    moveTo(index);
  }, [index, moveTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - track.offsetLeft);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !trackRef.current || !wrapperRef.current) return;

      const delta = e.pageX - startX; // 오른쪽 드래그 시 양수
      const itemWidth = wrapperRef.current.offsetWidth / visibleCount;

      const baseOffset = -index * itemWidth;
      const newOffset = baseOffset + delta;

      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(${newOffset}px)`;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging || !trackRef.current || !wrapperRef.current) return;

      setIsDragging(false);

      let deltaX, direction;

      if (startX <= e.pageX) {
        direction = '-';
        deltaX = e.pageX - startX;
      } else {
        direction = '+';
        deltaX = startX - e.pageX;
      }

      const itemWidth = wrapperRef.current.offsetWidth / visibleCount;
      const movedItems = Math.round(deltaX / itemWidth);

      if (movedItems !== 0) {
        setIndex((prev) => {
          return prev + (direction === '-' ? movedItems * -1 : movedItems);
        });
      } else {
        moveTo(index); // 드래그가 짧으면 원복
      }
    };

    if (draggable) {
      if (isDragging) {
        track.style.userSelect = 'none';
      } else {
        track.style.userSelect = '';
      }

      // 이벤트 등록
      track.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);

      // 정리
      return () => {
        track.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startX]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastWheel = 0;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now(); // 1970년 1월 1일 00:00:00 UTC부터 지금까지의 시간을 밀리초(ms) 단위로 반환

      if (now - lastWheel < 1000) return; // 디바운스

      if (e.deltaX > 20) {
        handleNext();
      } else if (e.deltaX < -20) {
        handlePrev();
      }

      lastWheel = now;
    };

    if (swipeable) {
      track.addEventListener('wheel', handleWheel);
      return () => track.removeEventListener('wheel', handleWheel);
    }
  }, []);

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
