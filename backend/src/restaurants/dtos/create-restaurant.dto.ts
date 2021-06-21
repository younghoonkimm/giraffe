import { InputType, Field, ArgsType } from "@nestjs/graphql";
import { IsString, IsBoolean, Length } from "class-validator";

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

@ArgsType()
export class CreateRestaurantDto {
  @Field(() => String)
  @IsString()
  @Length(5, 10)
  name: string;
  @Field(() => Boolean)
  @IsBoolean()
  isVegan: boolean;
  @Field(() => String)
  @IsString()
  address: string;
  @Field(() => String)
  @IsString()
  @Length(5, 10)
  ownerName: string;
}
