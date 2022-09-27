import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  provider: string;
  
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}