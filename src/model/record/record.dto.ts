import { IsDate, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  latitude: number;
  
  @IsNumber()
  longitude: number;

  @IsDate()
  createdAt: Date;
}
