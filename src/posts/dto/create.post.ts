import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePostRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  image: string;
}
