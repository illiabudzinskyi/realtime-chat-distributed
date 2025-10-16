import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findByName(name: string): Promise<User> {
    return await this.usersRepo.findOneBy({ username: name });
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const user = this.usersRepo.create(input);
    return this.usersRepo.save(user);
  }
}