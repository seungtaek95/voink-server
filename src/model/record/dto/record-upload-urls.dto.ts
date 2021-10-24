import { IsString } from 'class-validator';

export class RecordUploadUrlDto {
  @IsString()
  key: string;
  
  @IsString()
  thumbnailUrl: string;
  
  @IsString()
  recordUrl: string;
}
