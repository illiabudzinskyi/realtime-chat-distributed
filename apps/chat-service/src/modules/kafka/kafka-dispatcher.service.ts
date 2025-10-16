import { Injectable, OnModuleInit, OnModuleDestroy, Inject, Logger } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { KAFKA_CLIENT } from './kafka.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService } from '@chromaspace/shared';
import { REDIS_PUBSUB } from '../redis/redis-pubsub.provider';

@Injectable()
export class KafkaDispatcherService implements OnModuleInit, OnModuleDestroy {
  private consumer: Consumer;
  private readonly logger = new Logger(KafkaDispatcherService.name);

  constructor(
    @Inject(KAFKA_CLIENT) private readonly kafka: Kafka,
    @Inject(REDIS_PUBSUB) private readonly pubSub: RedisPubSub,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    this.consumer = this.kafka.consumer({ groupId: this.configService.kafka.groupId });
    await this.consumer.connect();

    await this.consumer.subscribe({ topic: this.configService.kafka.topic, fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;

        const payload = JSON.parse(message.value.toString());

        await this.pubSub.publish(`room.${payload.room.id}`, payload);
      },
    });

    this.logger.log('✅ KafkaDispatcherService connected and running');
  }

  async onModuleDestroy() {
    if (this.consumer) await this.consumer.disconnect();
  }
}