import { IsNumber, IsString } from 'class-validator';

export class CreateRecordGroupDto {
  @IsNumber()
  userId: number;

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