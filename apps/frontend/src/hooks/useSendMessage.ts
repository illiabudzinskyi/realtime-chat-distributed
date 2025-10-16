import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../api';

export function useSendMessage(userId: string, roomId: string, options = {}) {
  const qc = useQueryClient();
  
  return useMutation({
    ...options,
    mutationFn: (content: string) => sendMessage(roomId, userId, content),
  });
};