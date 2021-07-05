import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from './ingredient.entity';
import { IngredientResolver } from './ingredient.resolver';
import { IngredientService } from './ingredient.service';

@Module({
  providers: [IngredientResolver, IngredientService],
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
})
export class IngredientModule {}
