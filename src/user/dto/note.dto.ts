import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export const createNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  verseRef: z.string().min(1, 'Verse reference is required'),
});

export const updateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

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
