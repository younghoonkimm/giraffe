import {
  ObjectType,
  InputType,
  registerEnumType,
  Field,
  Float,
} from "@nestjs/graphql";
import { Entity, Column, ManyToOne, JoinTable } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { Dish } from "src/restaurants/entities/dish.entitiy";

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
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, { onDelete: "SET NULL" })
  customer: User;

  @Field(() => User, { nullable: true })
  driver: User;

  @Field(() => Restaurant)
  restaurant: Restaurant;

  @Field(() => [Dish])
  @JoinTable()
  dishes: Dish[];

  @Column()
  @Field(() => Float)
  total: number;

  @Column({ type: "enum", enum: OrderStatus })
  @Field(() => OrderStatus)
  status: OrderStatus;
}
