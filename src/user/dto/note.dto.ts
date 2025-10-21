import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'Content is required' })
  content: string;

  @ApiProperty({ example: 'BG1.1' })
  @IsString()
  @MinLength(1, { message: 'Verse reference is required' })
  verseRef: string;
}

export class UpdateNoteDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
