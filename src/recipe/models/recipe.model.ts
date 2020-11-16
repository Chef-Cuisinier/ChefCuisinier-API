import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Recipe {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  difficulty: number;

  @Field()
  preparationTime: number;

  @Field()
  cookingTime: number;

  @Field()
  restTime: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
