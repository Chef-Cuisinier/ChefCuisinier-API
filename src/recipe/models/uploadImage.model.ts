import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadRecipeImage {
  @Field()
  uploaded: boolean;

  @Field()
  name?: string;
}
