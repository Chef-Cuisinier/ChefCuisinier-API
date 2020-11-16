import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditRecipeInput } from './dto/editRecipe.dto';
import { NewRecipeInput } from './dto/newRecipe.dto';
import { RecipesArgs } from './dto/recipes.dto';
import { Recipe } from './models/recipe.model';
import { RecipeEntity } from './recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
  ) {}

  async findOneById(id: string): Promise<Recipe> {
    return await this.recipeRepository.findOne(id);
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return await this.recipeRepository.find(recipesArgs);
  }

  async create(data: NewRecipeInput): Promise<Recipe> {
    const recipe = new Recipe();
    // --- Fill the recipe object
    recipe.title = data.title;
    recipe.description = data.description;
    recipe.price = data.price;
    recipe.difficulty = data.difficulty;
    recipe.preparationTime = data.preparationTime;
    recipe.cookingTime = data.cookingTime;
    recipe.restTime = data.restTime;
    recipe.createdAt = new Date();
    // --- Save the recipe in database
    return await this.recipeRepository.save(recipe);
  }

  async remove(id: string): Promise<Recipe> {
    // Get the recipe from database
    const recipe = await this.recipeRepository.findOne(id);
    // Remove the recipe from database
    await this.recipeRepository.delete(recipe);
    // Return the deleted recipe
    return recipe;
  }

  async edit(data: EditRecipeInput): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne(data.id);
    // Replace the recipe object
    recipe.title = data.title;
    recipe.description = data.description;
    recipe.price = data.price;
    recipe.difficulty = data.difficulty;
    recipe.preparationTime = data.preparationTime;
    recipe.cookingTime = data.cookingTime;
    recipe.restTime = data.restTime;
    // Save the edited recipe in database
    return await this.recipeRepository.save(recipe);
  }
}
