import { userApi } from "./client";

export interface User {
  id: string;
  username: string;
  createdAt?: string;
}

export async function createUser(username: string): Promise<User> {
  const query = `
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        username
        isOnline
        avatarUrl
      }
    }
  `;
  const { data } = await userApi.post("", { query, variables: { input: { username } } });
  return data.data.createUser;
}

export async function getUsers(): Promise<User[]> {
  const query = `
    query {
      users {
        id
        username
        createdAt
      }
    }
  `;
  const { data } = await userApi.post("", { query });
  return data.data.users;
}

export async function getUserByName(name: string): Promise<User> {
  const query = `
    query GetUserByName($name: String!) {
      user(name: $name) {
        id
        username
      }
    }
  `;
  const { data } = await userApi.post("", { query, variables: { name } });
  if (data?.errors?.length) {
    return null
  }
  return data.data.user;
}