import { InputType, Field, ObjectType } from "@nestjs/graphql";
import { Restaurant } from "../entities/restaurant.entity";
import {
  PaginationInput,
  PaginationOutput,
} from "src/common/dto/pagination.dto";

@InputType()
export class SearchRestaurantInput extends PaginationInput {
  @Field(() => String)
  query: string;
}

@ObjectType()
export class SearchRestaurantOutput extends PaginationOutput {
  @Field(() => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}
