import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
