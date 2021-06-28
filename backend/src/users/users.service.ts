import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import { User } from "./entities/user.entity";
import {
  CreateAccountInput,
  CreateAccountOutput,
} from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verification.entity";
import { relative } from "path";
import { VerifyEmailOutput } from "./dtos/verify-email.dto";
import { UserProfileOutPut } from "./dtos/user-profile.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    //check new user
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: "등록된 사용자가 있습니다" };
      }
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );
      await this.verification.save(
        this.verification.create({
          user,
        }),
      );
      await this.verification.save(this.verification.create({ user }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "계정생성에 실패하였습니다" };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    // make a JWT and give it to the user
    try {
      const user = await this.users.findOne(
        { email },
        { select: ["id", "password"] },
      );
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: "Wrong password",
        };
      }
      const token = this.jwtService.sign({ id: user.id });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<UserProfileOutPut> {
    try {
      const user = await this.users.findOne({ id });
      if (user) {
        return {
          ok: true,
          user: user,
        };
      }
    } catch (error) {
      return { ok: false, error: "User Not Found" };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(userId);
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verification.save(this.verification.create({ user }));
      }
      if (password) {
        user.password = password;
      }
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

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verification.findOne(
        { code },
        { relations: ["user"] },
      );
      if (verification) {
        verification.user.verified = true;
        this.users.save(verification.user);
        return { ok: true };
      }
      return { ok: false, error: "notfound" };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
