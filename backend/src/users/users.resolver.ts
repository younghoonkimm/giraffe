import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import {
  CreateAccountOutput,
  CreateAccountInput,
} from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { AuthUser } from "src/auth/auth-user.decorator";
import { USerProfileInput, UserProfileOutPut } from "./dtos/user-profile.dto";
import { EditProfileOutput, EditProfileInput } from "./dtos/edit-profile.dto";
import { VerifyEmailOutput, VerifyEmailInput } from "./dtos/verify-email.dto";
import { Role } from "src/auth/role.decorator";

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
  @Role(["Any"])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Role(["Any"])
  @Query(() => UserProfileOutPut)
  async userProfile(
    @Args() userProfileInput: USerProfileInput,
  ): Promise<UserProfileOutPut> {
    return this.userService.findById(userProfileInput.userId);
  }

  @Role(["Any"])
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
