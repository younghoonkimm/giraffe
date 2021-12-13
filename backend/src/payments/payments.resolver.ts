import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Payment } from "./entities/payment.entity";
import { PaymentService } from "./payments.service";
import {
  CreatePaymentOutput,
  CreatePaymentInput,
} from "./dtos/create-payment.dto";
import { Role } from "src/auth/role.decorator";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "src/users/entities/user.entity";
import { GetPaymentOutput } from "./dtos/get-payment.dto";

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreatePaymentOutput)
  @Role(["Owner"])
  createPayment(
    @AuthUser() owner: User,
    @Args("input") createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(owner, createPaymentInput);
  }

  @Query(() => GetPaymentOutput)
  @Role(["Owner"])
  getPayments(@AuthUser() user: User): Promise<GetPaymentOutput> {
    return this.paymentService.getPayment(user);
  }
}
