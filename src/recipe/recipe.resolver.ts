import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { EditRecipeInput } from './dto/editRecipe.dto';
import { NewRecipeInput } from './dto/newRecipe.dto';
import { RecipesArgs } from './dto/recipes.dto';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './recipe.service';
import { UploadRecipeImage } from './models/uploadImage.model';

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

  @Mutation(() => Recipe)
  async addProduct(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipeService.create(newRecipeData);
    pubsub.publish('recipeAdded', { recipe });
    return recipe;
  }

  @Mutation(() => Recipe)
  async removeProduct(@Args('id') id: string) {
    return this.recipeService.remove(id);
  }

  @Mutation(() => Recipe)
  async editRecipe(
    @Args('editRecipeData') editRecipeData: EditRecipeInput,
  ): Promise<Recipe> {
    return this.recipeService.edit(editRecipeData);
  }

  @Mutation(() => UploadRecipeImage)
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<UploadRecipeImage> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () =>
          resolve({
            uploaded: true,
            name: filename,
          }),
        )
        .on('error', () =>
          reject({
            uploaded: false,
            name: null,
          }),
        ),
    );
  }

  @Subscription(() => Recipe)
  recipeAdded() {
    return pubsub.asyncIterator('recipeAdded');
  }
}
