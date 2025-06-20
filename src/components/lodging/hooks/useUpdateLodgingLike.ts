import { useMutation, useQueryClient } from '@tanstack/react-query';

const updteLikeLodging = async (id: string): Promise<void> => {
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
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['get-lodgings'] });
    },
  });
}
