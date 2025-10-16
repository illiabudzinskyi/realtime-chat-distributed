import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private roomRepo: Repository<ChatRoom>,
  ) {}

  findAll() {
    return this.roomRepo.find();
  }

  async create(name: string) {
    const room = this.roomRepo.create({ name });
    return this.roomRepo.save(room);
  }
}