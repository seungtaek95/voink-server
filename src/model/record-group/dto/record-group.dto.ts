import { IsNumber, IsOptional, IsString } from 'class-validator';
import { RecordDto } from '../../record/dto/record.dto';
import { Record } from '../../record/record.entity';

export class RecordGroupDto {
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

  @IsOptional()
  records?: RecordDto[]
}