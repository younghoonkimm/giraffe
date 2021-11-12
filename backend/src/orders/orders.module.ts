import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Order } from "./entities/order.entity";
import { OrderService } from "./orders.service";
import { OrderResolver } from "./orsers.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Order, User])],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}
