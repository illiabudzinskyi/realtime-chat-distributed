import { useMutation } from '@tanstack/react-query'
import { createUser } from '../api/user'

export function useCreateUser() {
  return useMutation({
    mutationFn: async (username: string) => createUser(username)
  });
};