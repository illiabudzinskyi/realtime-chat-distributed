import { Injectable } from '@nestjs/common';
import { User } from '@chromaspace/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { ChatRoom } from '../rooms/room.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,

    @InjectRepository(ChatRoom)
    private readonly roomRepo: Repository<ChatRoom>,
    
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getMessages(roomId: string) {
    return this.messageRepo.find({
      where: { room: { id: roomId } },
      relations: {
        room: true,
        user: true
      },
      relationLoadStrategy: 'query',
      order: { createdAt: 'ASC' },
    });
  }

  async addMessage(roomId: string, userId: string, content: string) {
    const room = await this.roomRepo.findOneBy({ id: roomId });
    
    if (!room){
      throw new Error(`Room with id ${roomId} not found`);
    }

    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const message = this.messageRepo.create({ content, user, room });
    return this.messageRepo.save(message);
  }
}