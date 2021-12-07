import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Order } from "./entities/order.entity";
import { OrderService } from "./orders.service";
import { OrderResolver } from "./orsers.resolver";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { OrderItem } from "./entities/order-item";
import { Dish } from "src/restaurants/entities/dish.entitiy";
import { CommonModule } from "src/common/common.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Restaurant, OrderItem, Dish]),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}
