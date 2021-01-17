import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientsArgs } from './dto/ingredients.dto';
import { IngredientEntity } from './ingredient.entity';
import { Ingredient } from './models/ingredient.model';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientEntity)
    private ingredientRepository: Repository<IngredientEntity>,
  ) {}

  async findOneById(id: string): Promise<Ingredient> {
    return await this.ingredientRepository.findOne(id);
  }

  async findAll(ingredientsArgs: IngredientsArgs): Promise<Ingredient[]> {
    return await this.ingredientRepository.find(ingredientsArgs);
  }

  async create();
}
