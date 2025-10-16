import { gql } from 'graphql-request'

export const GET_CHATS = gql`
  query GetChats {
    rooms {
      id
      name
      messages
    }
  }
`

export const GET_MESSAGES = gql`
  query GetMessages($roomId: ID!, $limit: Int) {
    getMessages(roomId: $roomId, limit: $limit) {
      id
      content
      createdAt
      user { id name }
    }
  }
`