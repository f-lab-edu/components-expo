import { useEffect } from 'react';

type UseIntersectionObserverProps = {
  targetRef: React.RefObject<HTMLElement | null>;
  containerRef: React.RefObject<HTMLElement | null>;
  onIntersect: () => void;
  threshold?: number;
};

export default function useIntersectionObserver({
  targetRef,
  containerRef,
  onIntersect,
  threshold = 1,
}: UseIntersectionObserverProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIntersect();
          }
        },
        { root: containerRef.current, threshold }
      );

      if (targetRef.current) observer.observe(targetRef.current);
      return () => observer.disconnect();
    }, 500);

    return () => clearTimeout(timer);
  }, [targetRef, containerRef, onIntersect, threshold]);
}
