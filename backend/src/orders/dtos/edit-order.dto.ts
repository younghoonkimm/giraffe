import { InputType, PickType } from "@nestjs/graphql";
import { Order } from "../entities/order.entity";

@InputType()
export class EditOrderInput extends PickType(Order, ["id", "status"]) {}
