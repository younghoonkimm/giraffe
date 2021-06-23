import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, Length, IsBoolean, IsOptional } from "class-validator";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  // @Field(() => Boolean, { nullable: true })
  @Field(() => Boolean, { defaultValue: true }) //in graphql schema
  @Column({ default: true }) //in database
  @IsOptional()
  @IsBoolean()
  isVegan?: boolean;

  @Field(() => String)
  @Column()
  @IsString()
  address?: string;

  @Field(() => String)
  @Column()
  @IsString()
  ownerName: string;

  @Field(() => String)
  @Column()
  @IsString()
  category: string;
}
