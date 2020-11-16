import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EditRecipeInput {
  @Field()
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
}
