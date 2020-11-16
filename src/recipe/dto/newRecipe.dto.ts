import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewRecipeInput {
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
}
