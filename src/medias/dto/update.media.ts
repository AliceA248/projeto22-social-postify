import { PartialType } from '@nestjs/mapped-types';
import { MediaCreationRequest } from './create.media';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMedia extends PartialType(MediaCreationRequest) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username: string;
}
