import type { ApiResponse } from '@/components/lodging/types/api';
import { useQuery } from '@tanstack/react-query';

const fetchLodgingList = async <T>(id: number): Promise<ApiResponse<T>> => {
  const response = await fetch(`/api/lodgings?id=${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw error; // E 타입으로 핸들링.
  }
  return response.json();
};

export function useGetLodgingItem<T, E = Error>(id: number) {
  const { data, ...rest } = useQuery<ApiResponse<T>, E>({
    queryKey: ['lodgings', id],
    queryFn: () => fetchLodgingList<T>(id),
  });

  return {
    ...rest,
    lodgings: data?.data ?? [],
    statusCode: data?.statusCode,
    message: data?.message,
  };
}
