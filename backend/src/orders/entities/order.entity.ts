import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";

import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from "typeorm";
import { Dish } from "src/restaurants/entities/dish.entitiy";
import { OrderItem } from "./order-item";
import { IsNumber, IsEnum } from "class-validator";

export enum OrderStatus {
  Pending = "Pending",
  Cooking = "Cooking",
  PickedUp = "PickedUp",
  Delivered = "Delivered",
}

registerEnumType(OrderStatus, { name: "OrderStatus" });

@InputType("OrderInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "SET NULL",
    nullable: true,
  })
  customer?: User;

  @RelationId((order: Order) => order.customer)
  customerId: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.rides, {
    onDelete: "SET NULL",
    nullable: true,
  })
  driver?: User;

  @RelationId((order: Order) => order.driver)
  driverId: number;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: "SET NULL",
    nullable: true,
  })
  restaurant?: Restaurant;

  @Field(() => [OrderItem])
  @ManyToMany(() => OrderItem)
  @JoinTable()
  items: OrderItem[];

  @Column({ nullable: true })
  @Field(() => Float, { nullable: true })
  @IsNumber()
  total?: number;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.Pending })
  @Field(() => OrderStatus)
  @IsEnum(OrderStatus)
  status: OrderStatus;
}