import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';
import { ChatRoom } from './room.entity';
import { KafkaModule } from '../kafka/kafka.module';
import { KafkaService } from '../kafka/kafka.service';
import { redisPubSubProvider } from '../redis/redis-pubsub.provider';
import { RedisModule} from '../redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom]), KafkaModule, RedisModule],
  providers: [RoomResolver, RoomService, KafkaService, redisPubSubProvider],
  exports: [RoomService],
})
export class RoomModule {}