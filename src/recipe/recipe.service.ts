import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
