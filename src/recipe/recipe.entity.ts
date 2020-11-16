import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'recipe' })
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int2' })
  price: number;

  @Column({ type: 'int2' })
  difficulty: number;

  @Column({ type: 'int4' })
  preparationTime: number;

  @Column({ type: 'int4' })
  cookingTime: number;

  @Column({ type: 'int4' })
  restTime: number;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updatedAt: Date;
}
