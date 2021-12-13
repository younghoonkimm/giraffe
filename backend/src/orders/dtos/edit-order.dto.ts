import { InputType, PickType, ObjectType } from "@nestjs/graphql";
import { Order } from "../entities/order.entity";
import { CoreOutput } from "src/common/dto/output.dto";

@InputType()
export class EditOrderInput extends PickType(Order, ["id", "status"]) {}

@ObjectType()
export class EditOrderOutput extends CoreOutput {}
