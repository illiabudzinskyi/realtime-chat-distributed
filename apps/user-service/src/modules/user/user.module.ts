import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}