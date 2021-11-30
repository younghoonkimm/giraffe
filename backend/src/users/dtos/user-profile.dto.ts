import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dto/output.dto";
import { User } from "../entities/user.entity";

@ArgsType()
export class USerProfileInput {
  @Field(() => Number)
  userId: number;
}

@ObjectType()
export class UserProfileOutPut extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
