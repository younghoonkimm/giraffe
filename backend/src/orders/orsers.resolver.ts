import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Order } from "./entities/order.entity";
import { OrderService } from "./orders.service";
import { CreateOrderOutput, CreateOrderInput } from "./dtos/create-order.dtos";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "src/users/entities/user.entity";
import { Role } from "src/auth/role.decorator";

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => CreateOrderOutput)
  @Role(["Client"])
  async createOrder(
    @AuthUser() customer: User,
    @Args("input")
    createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return {
      ok: true,
    };
  }
}
