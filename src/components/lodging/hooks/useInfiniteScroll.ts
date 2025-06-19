import { useInfiniteQuery } from '@tanstack/react-query';

const fetchLodgingList = async (pageParam: number) => {
  console.log('pageParma: ', pageParam);
  const response = await fetch(`/api/lodgings?offset=${pageParam}`);
  const result = await response.json();
  console.log('server response: ', result);
  return result;
};

export function useInfiniteScroll() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['get-lodgings-infinite'],
    queryFn: ({ pageParam = 0 }) => fetchLodgingList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log('lastPage: ', lastPage);
      return lastPage.hasNext ? lastPage.nextOffset : undefined;
    },
  });

  return { lodging: data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
}
