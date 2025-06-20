import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

type UseInfiniteScrollProps = {
  containerRef: React.RefObject<HTMLElement | null>;
  targetRef: React.RefObject<HTMLElement | null>;
};

const fetchLodgingList = async (pageParam: number) => {
  const response = await fetch(`/api/lodgings?offset=${pageParam}`);
  const result = await response.json();
  return result;
};

export function useInfiniteScroll({ containerRef, targetRef }: UseInfiniteScrollProps) {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['get-lodgings-infinite'],
    queryFn: ({ pageParam = 0 }) => fetchLodgingList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextOffset : undefined;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { root: containerRef.current, threshold: 0.8 }
      );

      if (targetRef.current) observer.observe(targetRef.current);
      return () => observer.disconnect();
    }, 500);

    return () => clearTimeout(timer);
  }, [targetRef.current, hasNextPage, fetchNextPage]);

  return { lodging: data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
}
