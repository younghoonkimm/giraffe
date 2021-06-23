import { InputType, Field, ArgsType, OmitType } from "@nestjs/graphql";
import { IsString, IsBoolean, Length } from "class-validator";
import { Restaurant } from "../entities/restauarnts.entity";

// @InputType()
// export class CreateRestaurantDto {
//   @Field(() => String)
//   name: string;
//   @Field(() => Boolean)
//   isVegan: boolean;
//   @Field(() => String)
//   address: string;
//   @Field(() => String)
//   ownerName: string;
// }

// @ArgsType()
// @InputType()
// export class CreateRestaurantDto {
//   @Field(() => String)
//   @IsString()
//   @Length(5, 10)
//   name: string;

//   @Field(() => Boolean)
//   @IsBoolean()
//   isVegan: boolean;

//   @Field(() => String)
//   @IsString()
//   address: string;

//   @Field(() => String)
//   @IsString()
//   @Length(5, 10)
//   ownerName: string;

//   @Field(() => String)
//   @IsString()
//   @Length(5, 10)
//   category: string;
// }

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ["id"]) {}
