
import { IRoom, IMessage } from "../types";
import { chatApi } from "./client";

export async function getMessages(roomId: string): Promise<IMessage[]> {
  const query = `
    query GetMessages($roomId: String!) {
      getMessages(roomId: $roomId) {
        id
        user {
          username
          id
        }
        content
      }
    }
  `;
  const { data } = await chatApi.post("", { query, variables: { roomId } });
  return data.data.getMessages;
}

export async function sendMessage(roomId: string, userId: string, content: string): Promise<IMessage> {
  const query = `
    mutation SendMessage($roomId: String!, $userId: String!, $content: String!) {
      sendMessage(roomId: $roomId, userId: $userId, content: $content) {
        id
        content
        createdAt
      }
    }
  `;
  const { data } = await chatApi.post("", { query, variables: { roomId, userId, content } });
  return data.data.sendMessage;
}

export async function createRoom(roomName: string): Promise<IMessage> {
  const query = `
    mutation CreateRoom($name: String!) {
      createRoom(name: $name) {
        id
        name
      }
    }
  `;
  const { data } = await chatApi.post("", { query, variables: { name: roomName } });
  return data.data.createRoom;
};

export async function getRooms(): Promise<IRoom[]> {
  const query = `
    query GetRooms {
      rooms {
        id
        name
      }
    }
  `;
  const { data } = await chatApi.post("", { query });
  return data.data.rooms;
}