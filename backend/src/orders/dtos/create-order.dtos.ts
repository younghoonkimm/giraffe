import { InputType, ObjectType, Field, Int, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dto/output.dto";
import { Order } from "../entities/order.entity";

@InputType()
export class CreateOrderInput extends PickType(Order, ["dishes"]) {
  @Field(() => Int)
  restaurantId: number;
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
