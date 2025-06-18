import type { ApiResponse } from '@/components/lodging/types/api';
import { useQuery } from '@tanstack/react-query';

const fetchLodgingList = async <T>(): Promise<ApiResponse<T>> => {
  const response = await fetch('/api/lodgings');
  return response.json();
};

export function useGetLodgingList<T>() {
  const { data, ...rest } = useQuery<ApiResponse<T>, Error>({
    queryKey: ['get-lodgings'],
    queryFn: fetchLodgingList,
  });

  return {
    ...rest,
    lodging: data?.data ?? [],
    statusCode: data?.statusCode,
    message: data?.message,
  };
}
