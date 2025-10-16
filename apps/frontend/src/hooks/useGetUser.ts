import { useMutation } from '@tanstack/react-query';
import { getUserByName } from '../api';

export function useGetUser() {
  return useMutation({
    mutationKey: ['user'],
    mutationFn: async (name: string) => await getUserByName(name)
  });
}