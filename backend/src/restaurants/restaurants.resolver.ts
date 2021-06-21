import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Restaurant } from "./entities/restauarnts.entity";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";

@Resolver(() => Restaurant)
export class RestaurantResolver {
  @Query(() => [Restaurant])
  restaurants(@Args("veganOnly") veganOnly: boolean): Restaurant[] {
    return [];
  }

  @Mutation(() => Boolean)
  createRestauant(@Args() createRestaurantInput: CreateRestaurantDto): boolean {
    console.log(createRestaurantInput);
    return true;
  }
}
