import { gql } from 'graphql-request'

export const MESSAGE_CREATED = gql`
  subscription OnMessageCreated($chatId: ID!) {
    messageCreated(chatId: $chatId) {
      id
      content
      createdAt
      user { id name }
    }
  }
`