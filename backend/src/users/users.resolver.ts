import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import {
  CreateAccountOutput,
  CreateAccountInput,
} from "./dtos/create-account.dto";
import { MutationOutput } from "src/common/dto/output.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUser } from "src/auth/auth-user.decorator";
import { USerProfileInput, UserProfileOutPut } from "./dtos/user-profile.dto";
import { EditProfileOutput, EditProfileInput } from "./dtos/edit-profile.dto";

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
      return this.userService.createAccount(createAccountInput);
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Mutation(() => LoginOutput)
  async login(@Args("input") loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.userService.login(loginInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  //   me(@Context() context) {
  //     if (!context.user) {
  //       return;
  //     } else {
  //       return context.user;
  //     }
  //   }
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query(() => UserProfileOutPut)
  async userProfile(
    @Args() userProfileInput: USerProfileInput,
  ): Promise<UserProfileOutPut> {
    try {
      const user = await this.userService.findById(userProfileInput.userId);
      if (!user) {
        throw Error();
      }
      if (user) {
        return {
          ok: true,
          user,
        };
      }
    } catch (e) {
      return {
        error: "notfound",
        ok: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args("input") editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      await this.userService.editProfile(authUser.id, editProfileInput);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
