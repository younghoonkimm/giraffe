import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";

import { User } from "../entities/user.entity";
import { CoreOutput } from "src/common/dto/output.dto";

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ["email", "password"]),
) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
