import {
  InputType,
  PickType,
  PartialType,
  ObjectType,
  Field,
  Int,
} from "@nestjs/graphql";
import { Dish } from "../entities/dish.entitiy";
import { CoreOutput } from "src/common/dto/output.dto";

@InputType()
export class EditDishInput extends PickType(PartialType(Dish), [
  "name",
  "options",
  "price",
  "description",
]) {
  @Field(() => Int)
  dishId: number;
}

@ObjectType()
export class EditDishOutput extends CoreOutput {}
