import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePublicationInput } from './create-publication.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePublicationInput extends PartialType(
  CreatePublicationInput,
) {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;
}
