import { GqlAuthGuard } from './../auth/auth.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly UsersService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.UsersService.create(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'Users' })
  findAll() {
    return this.UsersService.findAll();
  }

  @Query(() => User, { name: 'UserById' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.UsersService.findById(id);
  }

  @Query(() => User, { name: 'UserByEmail' })
  findByEmail(@Args('email', { type: () => String }) email: string) {
    return this.UsersService.findByEmail(email);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.UsersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => String }) id: string) {
  //   return this.UsersService.remove(id);
  // }
}
