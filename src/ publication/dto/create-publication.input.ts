import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePublicationInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  message: string;

  @Field()
  @IsNotEmpty()
  publication_date: number;

  @Field()
  like?: number = 0;

  @Field()
  @IsNotEmpty()
  user: string;
}
