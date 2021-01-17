import { NotFoundException, Query } from '@nestjs/common';
import { Args, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Recipe } from 'src/recipe/models/recipe.model';
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
