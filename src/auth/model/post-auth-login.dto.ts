import { IsString } from 'class-validator';

export class PostAuthLoginDto {
  @IsString()
  accessToken: string;
}