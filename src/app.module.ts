import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmBaseService } from './config.service';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [TypeOrmBaseService],
      useClass: TypeOrmBaseService,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
    }),
    RecipeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
