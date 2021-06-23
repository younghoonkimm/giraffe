import { Entity, Column, BeforeInsert } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";
import {
  Field,
  ObjectType,
  InputType,
  registerEnumType,
} from "@nestjs/graphql";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsString, IsEnum } from "class-validator";

// const role = {
//   client: "client",
//   owner: "owner",
//   delivery: "delivery",
// } as const;

// type UserRole = typeof role[keyof typeof role];

enum UserRole {
  Owner,
  Client,
  Delivery,
}

registerEnumType(UserRole, { name: "UserRole" });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(() => String)
  @IsString()
  password: string;

  @Column({ type: "enum", enum: UserRole })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
