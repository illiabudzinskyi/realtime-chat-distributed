import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@chromaspace/shared';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { KafkaService } from '../kafka/kafka.service';
import { REDIS_PUBSUB } from '../redis/redis-pubsub.provider';

@Resolver(() => Message)
export class MessageResolver {

  constructor(
    private readonly kafkaService: KafkaService,
    private readonly messageService: MessageService,
    private readonly configService: ConfigService,
    @Inject(REDIS_PUBSUB) private readonly pubSub: RedisPubSub
  ) {}

  @Query(() => [Message])
  async getMessages(@Args('roomId') roomId: string) {
    return this.messageService.getMessages(roomId);
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('roomId') roomId: string,
    @Args('userId') userId: string,
    @Args('content') content: string,
  ) {
    const message = await this.messageService.addMessage(roomId, userId, content);

    await this.kafkaService.sendMessage(this.configService.kafka.topic, message);

    return message;
  }

  @Subscription(() => Message, {
    resolve: (value) => value,
  })
  messageSent(@Args('roomId') roomId: string) {

    return this.pubSub.asyncIterableIterator(`room.${roomId}`)
  }
}