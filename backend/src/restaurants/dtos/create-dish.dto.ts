import { InputType, Field, Int, PickType, ObjectType } from "@nestjs/graphql";
import { Dish } from "../entities/dish.entitiy";
import { CoreOutput } from "src/common/dto/output.dto";

@InputType()
export class CreateDishInput extends PickType(Dish, [
  "name",
  "price",
  "description",
  "options",
]) {
  @Field(() => Int)
  restaurantId: number;
}

@ObjectType()
export class CreateDishOutput extends CoreOutput {}
