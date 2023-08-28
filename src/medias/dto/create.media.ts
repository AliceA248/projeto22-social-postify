import { IsString, IsNotEmpty } from 'class-validator';

export class MediaCreationRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}
