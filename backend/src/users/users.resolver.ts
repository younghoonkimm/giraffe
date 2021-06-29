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
import { VerifyEmailOutput, VerifyEmailInput } from "./dtos/verify-email.dto";

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
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args("input") loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
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
    return this.userService.findById(userProfileInput.userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args("input") editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return await this.userService.editProfile(authUser.id, editProfileInput);
  }

  @Mutation(() => VerifyEmailOutput)
  async verifyEmail(
    @Args("input") verifyEmailInput: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return await this.userService.verifyEmail(verifyEmailInput.code);
  }
}
