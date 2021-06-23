import { Entity, Column, BeforeInsert } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";
import {
  Field,
  ObjectType,
  InputType,
  registerEnumType,
} from "@nestjs/graphql";

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
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ type: "enum", enum: UserRole })
  @Field(() => UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {}
}
