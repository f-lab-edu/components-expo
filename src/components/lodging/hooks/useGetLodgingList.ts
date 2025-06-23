import type { ApiResponse } from '@/components/lodging/types/api';
import { useQuery } from '@tanstack/react-query';

const fetchLodgingList = async <T>(): Promise<ApiResponse<T>> => {
  const response = await fetch('/api/lodgings');
  if (!response.ok) {
    const error = await response.json();
    throw error; // E 타입으로 핸들링.
  }
  return response.json();
};

export function useGetLodgingList<T, E = Error>() {
  const { data, ...rest } = useQuery<ApiResponse<T>, E>({
    queryKey: ['lodgings'],
    queryFn: () => fetchLodgingList<T>(),
  });

  return {
    ...rest,
    lodgings: data?.data ?? [],
    statusCode: data?.statusCode,
    message: data?.message,
  };
}
