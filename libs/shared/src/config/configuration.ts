import { group } from "console";

export default () => ({
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),

  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASS ?? 'postgres',
    name: process.env.DB_NAME ?? 'chromaspace',
    sync: process.env.DB_SYNC ?? true
  },

  graphql: {
    playground: process.env.GRAPHQL_PLAYGROUND !== 'false',
    csrfPrevention: process.env.GRAPHQL_CSRF === 'true',
    introspection: process.env.GRAPHQL_INTROSPECTION !== 'false',
  },

  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID ?? '',
    brokers: process.env.KAFKA_BROKERS ?? '',
    groupId: process.env.KAFKA_GROUP_ID ?? '',
    topic: process.env.KAFKA_TOPIC ?? '',
  },

  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    password: process.env.REDIS_PASSWORD ?? undefined,
  },

  security: {
    corsOrigin: process.env.CORS_ORIGIN ?? '*',
  },
});