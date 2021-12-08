import { Field, ObjectType } from "@nestjs/graphql";
import { Payment } from "../entities/payment.entity";
import { CoreOutput } from "src/common/dto/output.dto";

@ObjectType()
export class GetPaymentOutput extends CoreOutput {
  @Field(() => [Payment], { nullable: true })
  payments?: Payment[];
}
