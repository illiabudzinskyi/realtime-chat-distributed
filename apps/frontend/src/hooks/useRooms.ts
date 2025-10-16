import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMessages, getRooms } from '../api';

export function useRooms() {
  const qc = useQueryClient()
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => await getRooms(),
    refetchInterval: false
  });
}