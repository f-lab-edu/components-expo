import { useEffect, useRef } from 'react';

type ImpressionAreaProps = {
  threshold?: number;
  onIntersect: () => void;
};

export default function ImpressionArea({ onIntersect, threshold = 0.75 }: ImpressionAreaProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current) return;
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIntersect();
          }
        },
        { threshold }
      );
      if (targetRef.current) observer.observe(targetRef.current);
      return () => observer.disconnect();
    }, 500);

    return () => clearTimeout(timer);
  }, [onIntersect, threshold]);

  return <div ref={targetRef}></div>;
}
