import { IsNumber, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  recordGroupId: number;

  @IsString()
  title: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  latitude: number;
  
  @IsNumber()
  longitude: number;
}
