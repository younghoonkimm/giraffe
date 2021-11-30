import { InputType, ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, Column, ManyToOne } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";
import {
  Dish,
  DishOption,
  DishChoice,
} from "src/restaurants/entities/dish.entitiy";

@InputType("OrderItemOptionInputType", { isAbstract: true })
@ObjectType()
export class OrderItemOption {
  @Field(() => String)
  name: string;
  @Field(() => String, { nullable: true })
  choice?: String;
}

@InputType("OrderItemInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @Field(() => Dish)
  @ManyToOne(() => Dish, { nullable: true, onDelete: "CASCADE" })
  dish: Dish;

  @Field(() => [OrderItemOption], { nullable: true })
  @Column({ type: "json", nullable: true })
  options?: OrderItemOption[];
}
