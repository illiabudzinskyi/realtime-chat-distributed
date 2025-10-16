import { createClient } from 'graphql-ws'

const CHAT_SERVICE_WS = import.meta.env.VITE_CHAT_SERVICE_WS;


export const wsClient = createClient({
  url: CHAT_SERVICE_WS
});