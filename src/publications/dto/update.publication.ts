import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create.publication';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
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
