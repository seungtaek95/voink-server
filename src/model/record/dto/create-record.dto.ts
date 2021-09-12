import { IsNumber, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  key: string;
  
  @IsString()
  title: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  latitude: number;
  
  @IsNumber()
  longitude: number;
}
