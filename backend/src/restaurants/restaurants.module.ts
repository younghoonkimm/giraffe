import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Restaurant } from "./entities/restaurant.entity";
import {
  RestaurantResolver,
  CategoryResolver,
  DishResolver,
} from "./restaurants.resolver";
import { RestaurantService } from "./restaurants.service";
import { CategoryRepository } from "./repositories/category.repository";
import { Dish } from "./entities/dish.entitiy";

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository, Dish])],
  providers: [
    RestaurantResolver,
    RestaurantService,
    CategoryResolver,
    DishResolver,
  ],
})
export class RestaurantsModule {}
