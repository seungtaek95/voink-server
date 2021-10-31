import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class RecordDto {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  recordGroupId: number;

  @IsString()
  title: string;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  thumbnailUrl: string;

  @IsOptional()
  @IsString()
  recordUrl: string;

  @IsNumber()
  latitude: number;
  
  @IsNumber()
  longitude: number;

  @IsNumber()
  time: number;
}
