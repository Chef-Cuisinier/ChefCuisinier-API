import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewRecipeInput {
  @Field()
  name: string;
}
