import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class MutationOutput {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  ok: boolean;
}
