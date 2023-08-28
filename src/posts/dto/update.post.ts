import { IsOptional, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostRequest } from './create.post';

export class UpdatePostDto extends PartialType(CreatePostRequest) {
  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  title: string;

  @IsOptional()
  text: string;
}
