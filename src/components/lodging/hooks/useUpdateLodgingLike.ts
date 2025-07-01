import type { ApiResponse } from '@/components/lodging/types/api';
import type { LodgingProps } from '@/components/lodging/types/lodging';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updteLikeLodging = async (id: string): Promise<ApiResponse<LodgingProps>> => {
  const response = await fetch(`/api/lodgings`, {
    method: 'PUT',
    body: JSON.stringify({ id }),
  });
  return response.json();
};

export function useUpdateLodgingLike() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updteLikeLodging,
    onSuccess: ({ data: updatedItem }: ApiResponse<LodgingProps>) => {
      client.invalidateQueries({ queryKey: ['lodgings', updatedItem.id] });
      client.setQueryData(['lodgings'], (oldData: ApiResponse<LodgingProps[]>) => {
        const { data, ...rest } = oldData;
        if (!data) return [];
        const updated = data.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        return { ...rest, data: updated };
      });
    },
  });
}
