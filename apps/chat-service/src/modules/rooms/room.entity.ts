import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Message } from '../messages/message.entity';

@ObjectType()
@Entity()
export class ChatRoom {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}