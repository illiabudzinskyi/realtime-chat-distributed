import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoom } from '../api';
import { IRoom } from '../types';

export function useCreateRoom(options = {}) {
  const qc = useQueryClient();
  
  return useMutation({
    ...options,
    mutationFn: async (roomName: string) => {
      const room = await createRoom(roomName);
      qc.setQueryData<IRoom[]>(["rooms"], (old = []) => [...old, room]);
      return room;
    },
  });
};