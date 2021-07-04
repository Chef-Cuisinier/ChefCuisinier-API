import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './models/ingredient.model';

const pubsub = new PubSub();

@Resolver(() => Ingredient)
export class IngredientResolver {
  constructor(private readonly ingredientService: IngredientService) {}

  @Query(() => Ingredient)
  async ingredient(@Args('id') id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientService.findOneById(id);

    if (!ingredient) {
      throw new NotFoundException(id);
    }

    return ingredient;
  }
}
