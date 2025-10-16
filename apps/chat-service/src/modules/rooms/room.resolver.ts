import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { ChatRoom } from './room.entity';
import { KafkaService } from '../kafka/kafka.service';

@Resolver(() => ChatRoom)
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    private readonly kafkaService: KafkaService
  ) {}

  @Query(() => [ChatRoom])
  rooms() {
    return this.roomService.findAll();
  }

  @Mutation(() => ChatRoom)
  async createRoom(@Args('name') name: string) {
    const room = await this.roomService.create(name);

    await this.kafkaService.createTopicIfNotExists(`chat-room.${room.id}`);

    return room;
  }
}