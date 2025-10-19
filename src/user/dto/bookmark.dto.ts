import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, MinLength } from 'class-validator';

export const createBookmarkSchema = z.object({
  verseRef: z.string().min(1, 'Verse reference is required'),
  tags: z.array(z.string()).optional(),
});

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
