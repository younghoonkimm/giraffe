import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";

import { User } from "../entities/user.entity";
import { MutationOutput } from "src/common/dto/output.dto";

@ObjectType()
export class EditProfileOutput extends MutationOutput {}

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ["email", "password"]),
) {}
