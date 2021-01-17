import { Module } from '@nestjs/common';
import { IngredientResolver } from './ingredient.resolver';
import { IngredientService } from './ingredient.service';

@Module({
  providers: [IngredientResolver, IngredientService],
})
export class IngredientModule {}
