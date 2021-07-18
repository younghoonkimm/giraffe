import { InputType, Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dto/output.dto";

@InputType()
export class DeleteRestaurantInput {
  @Field(() => Number)
  restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutput extends CoreOutput {}
