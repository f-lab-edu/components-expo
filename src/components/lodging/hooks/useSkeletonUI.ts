import { useEffect, useState } from 'react';

type UseSkeletonUIProps = {
  containerRef: React.RefObject<HTMLElement | null>;
  itemWidth: number;
};

export function useSkeletonUI({ containerRef, itemWidth }: UseSkeletonUIProps) {
  const [skeletonCount, setSkeletonCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const count = Math.floor(containerRef.current.offsetWidth / itemWidth);
    setSkeletonCount(count);
  }, [containerRef, itemWidth]);

  return { skeletonCount };
}
