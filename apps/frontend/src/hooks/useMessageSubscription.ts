import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { wsClient } from "../graphql/client";

interface Message {
  id: string;
  chatId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export const useMessageSubscription = (roomId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roomId) return;
    
    const client = wsClient;
    const unsubscribe = client.subscribe(
      {
        query: `
          subscription MessageSent($roomId: String!) {
            messageSent(roomId: $roomId) {
              id
              content
              user {
                id
                username
              }
            }
          }
        `,
        variables: { roomId }
      },
      {
        next: (event) => {
          const message = (event as any).data?.messageSent;
          if (!message) return;
          queryClient.setQueryData<Message[]>(["messages", roomId], (old = []) => [...old, message]);
        },
        error: console.error,
        complete: () => console.log("Subscription completed"),
      }
    );

    return () => {
      try {
        unsubscribe();
      } catch {}
    };
  }, [roomId, queryClient]);
}