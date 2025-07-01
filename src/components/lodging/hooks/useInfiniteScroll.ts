import { useGetDataInfinite } from '@/components/lodging/hooks/useGetDataInfinite';
import useIntersectionObserver from '@/components/lodging/hooks/useIntersectionObserver';

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
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetDataInfinite({
    queryKey: ['get-lodgings-infinite'],
    fetchFunc: fetchLodgingList,
  });

  useIntersectionObserver({
    containerRef,
    targetRef,
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    threshold: 0.75,
  });

  return { lodging: data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
}
