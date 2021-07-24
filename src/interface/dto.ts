import { IsEmail } from 'class-validator';

export class CreateUserDto {
  provider: string;
  
  name: string;

  @IsEmail()
  email: string;
}