import { PartialType } from '@nestjs/mapped-types';
import { CreatePublication } from './create.publication';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePublication extends PartialType(CreatePublication) {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  mediaId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;
}
