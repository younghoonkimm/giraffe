import { InputType, PickType, ObjectType } from "@nestjs/graphql";
import { Payment } from "../entities/payment.entity";
import { CoreOutput } from "src/common/dto/output.dto";

@InputType()
export class CreatePaymentInput extends PickType(Payment, [
  "transactionId",
  "restaurantId",
]) {}

@ObjectType()
export class CreatePaymentOutput extends CoreOutput {}
