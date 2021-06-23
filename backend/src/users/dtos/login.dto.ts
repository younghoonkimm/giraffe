import { InputType, ObjectType, Field, PickType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dto/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class LoginInput extends PickType(User, ["email", "password"]) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
