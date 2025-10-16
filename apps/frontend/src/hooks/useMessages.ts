import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMessages } from '../api';

export function useMessages(roomId: string) {
  const qc = useQueryClient()
  return useQuery({
    queryKey: ['messages', roomId],
    queryFn: async () => await getMessages(roomId),
    enabled: !!roomId,
    refetchInterval: false
  });
}