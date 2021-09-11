import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateRecordDto } from '../record/record.dto';
import { User } from '../user/user.entity';

export class CreateRecordGroupDto {
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

export class RecordGroupDto {
  @IsObject()
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