import { Module } from '@nestjs/common';
import { ConfigModule, User } from '@chromaspace/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { ChatRoom } from '../rooms/room.entity';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { RedisModule } from '../redis/redis.module';
import { KafkaModule } from '../kafka/kafka.module';
import { redisPubSubProvider } from '../redis/redis-pubsub.provider';
import { KafkaService } from '../kafka/kafka.service';
import { KafkaDispatcherService } from '../kafka/kafka-dispatcher.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Message, ChatRoom, User]), KafkaModule, RedisModule],
  providers: [
    MessageResolver,
    MessageService,
    KafkaService,
    KafkaDispatcherService,
    redisPubSubProvider,
  ],
  exports: [MessageService]
})
export class MessageModule {}