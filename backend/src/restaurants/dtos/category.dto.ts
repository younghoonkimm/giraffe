import { ObjectType, Field, ArgsType, InputType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dto/output.dto";
import { Category } from "../entities/category.entity";
import {
  PaginationInput,
  PaginationOutput,
} from "src/common/dto/pagination.dto";
import { Restaurant } from "../entities/restaurant.entity";

@InputType()
export class CategoryInput extends PaginationInput {
  @Field(() => String)
  slug: string;
}

@ObjectType()
export class CategoryOutput extends PaginationOutput {
  @Field(() => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];

  @Field(() => Category, { nullable: true })
  category?: Category;
}
