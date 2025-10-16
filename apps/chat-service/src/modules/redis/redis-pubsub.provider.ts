import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.module';

export const REDIS_PUBSUB = 'REDIS_PUBSUB';

export const redisPubSubProvider: Provider = {
  provide: REDIS_PUBSUB,
  inject: [REDIS_CLIENT],
  useFactory: (redisClient: Redis) => {
    return new RedisPubSub({ publisher: redisClient, subscriber: redisClient.duplicate() });
  },
};