import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import {
  CreateAccountOutput,
  CreateAccountInput,
} from "./dtos/create-account.dto";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => Boolean)
  hi() {
    return true;
  }

  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args("input") createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.userService.createAccount(
        createAccountInput,
      );
      return {
        ok,
        error,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }
}
