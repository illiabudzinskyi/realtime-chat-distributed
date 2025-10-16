import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, RelationId } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@chromaspace/shared';
import { ChatRoom } from '../rooms/room.entity';

@ObjectType()
@Entity()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  content: string;
  
  @Field(() => User)
  @ManyToOne(() => User, { 
    eager: false,
    nullable: false,
    createForeignKeyConstraints: false
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => ChatRoom)
  @ManyToOne(() => ChatRoom, (room) => room.messages)
  room: ChatRoom;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}