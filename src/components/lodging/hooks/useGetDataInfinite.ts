import { useInfiniteQuery } from '@tanstack/react-query';

type UseGetDataInfiniteProps = {
  queryKey: string[];
  fetchFunc: (pageParam: number) => Promise<{ hasNext: boolean; nextOffset: number }>;
};

export function useGetDataInfinite({ queryKey, fetchFunc }: UseGetDataInfiniteProps) {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => fetchFunc(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextOffset : undefined;
    },
  });
}
