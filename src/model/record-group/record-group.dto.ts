import { IsNumber, IsString } from 'class-validator';
import { User } from '../user/user.entity';

export class CreateRecordGroupDto {
  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsString()
  recordType: string;

  @IsNumber()
  latitude: number;
  
  @IsNumber()
  longitude: number;
}

export class RecordGroupDto {
  @IsNumber()
  user: User;

  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsString()
  recordType: string;

  @IsNumber()
  latitude: number;
  
  @IsNumber()
  longitude: number;
}