import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('name') name: string): Promise<User> {
    return await this.userService.findByName(name);
  }

  @Mutation(() => User)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(input);
  }
}