import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { RecipesArgs } from './dto/recipes.dto';
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

  @Query(() => [Recipe])
  recipes(@Args() recipeArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipeService.findAll(recipeArgs);
  }
}
