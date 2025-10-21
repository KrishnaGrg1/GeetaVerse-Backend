import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: 'clx123abc456' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'USER', enum: ['USER', 'ADMIN'] })
  role: string;

  @ApiProperty({ example: false })
  isPremium: boolean;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-20T14:25:00.000Z' })
  updatedAt: Date;
}

export class NoteDto {
  @ApiProperty({ example: 'clx123note456' })
  id: string;

  @ApiProperty({ example: 'My Insights', required: false })
  title?: string;

  @ApiProperty({ example: 'This verse teaches us about...' })
  content: string;

  @ApiProperty({ example: 'BG2.47' })
  verseRef: string;

  @ApiProperty({ example: 'clx123user789' })
  userId: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-20T14:25:00.000Z' })
  updatedAt: Date;
}

export class BookmarkDto {
  @ApiProperty({ example: 'clx123book456' })
  id: string;

  @ApiProperty({ example: 'BG2.47' })
  verseRef: string;

  @ApiProperty({ example: ['karma', 'dharma'], type: [String], required: false })
  tags?: string[];

  @ApiProperty({ example: 'clx123user789' })
  userId: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;
}

export class PaginatedNotesDto {
  @ApiProperty({ type: [NoteDto] })
  items: NoteDto[];

  @ApiProperty({ example: 50 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 5 })
  totalPages: number;
}

export class PaginatedBookmarksDto {
  @ApiProperty({ type: [BookmarkDto] })
  items: BookmarkDto[];

  @ApiProperty({ example: 25 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 3 })
  totalPages: number;
}
