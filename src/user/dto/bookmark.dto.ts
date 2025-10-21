import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, MinLength } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({ example: 'BG2.47' })
  @IsString()
  @MinLength(1, { message: 'Verse reference is required' })
  verseRef: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
