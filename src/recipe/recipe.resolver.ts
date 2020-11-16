import { NotFoundException, Query } from '@nestjs/common';
import { Args, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './recipe.service';

const pubsub = new PubSub();

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query(() => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipeService.findOneById(id);

    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }
}
