import { InputType, PartialType, ArgsType, Field } from "@nestjs/graphql";

import { CreateRestaurantDto } from "./create-restaurant.dto";

@InputType()
// @PartialType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDto,
) {}

@InputType()
export class UpdateRestaurantDto {
  @Field(() => Number)
  id: number;

  @Field(() => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
