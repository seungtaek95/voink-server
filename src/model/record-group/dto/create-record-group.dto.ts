import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateRecordDto } from '../../record/dto/create-record.dto';

export class CreateRecordGroupDto {
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecordDto)
  records?: CreateRecordDto[];
}
