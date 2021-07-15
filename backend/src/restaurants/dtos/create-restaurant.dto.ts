import {
  InputType,
  OmitType,
  ObjectType,
  PickType,
  Field,
} from "@nestjs/graphql";
import { Restaurant } from "../entities/restaurant.entity";
import { MutationOutput } from "src/common/dto/output.dto";

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  "name",
  "coverImg",
  "address",
]) {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends MutationOutput {}
