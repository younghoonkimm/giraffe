import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class CoreOutput {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  ok: boolean;
}
