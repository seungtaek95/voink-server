import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { RecordDto } from '../../record/dto/record.dto';

export class RecordGroupDto {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;

  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  location: string;

  @IsString()
  recordType: string;

  @IsNumber()
  latitude: number;
  
  @IsNumber()
  longitude: number;
  
  @IsDate()
  createdAt: Date;

  @IsOptional()
  records?: RecordDto[]
}