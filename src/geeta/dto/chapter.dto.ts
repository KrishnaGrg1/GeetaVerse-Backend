import { ApiProperty } from '@nestjs/swagger';

export class ChapterDto {
  @ApiProperty({ example: 1 })
  chapter_number: number;

  @ApiProperty({ example: 'Arjuna Vishada Yoga' })
  chapter_name_en: string;

  @ApiProperty({ example: 'अर्जुनविषादयोग' })
  chapter_name_hi: string;

  @ApiProperty({ example: 'Arjuna Dilemma' })
  chapter_title_en: string;

  @ApiProperty({ example: 'अर्जुन का शोक' })
  chapter_title_hi: string;

  @ApiProperty({ example: 'This chapter describes...' })
  chapter_summary_en: string;

  @ApiProperty({ example: 'इस अध्याय में...' })
  chapter_summary_hi: string;

  @ApiProperty({ example: 47 })
  verse_count: number;
}

export class VerseDto {
  @ApiProperty({ example: 1 })
  chapter_number: number;

  @ApiProperty({ example: 1 })
  verse_number: number;

  @ApiProperty({ example: 'Sanskrit text' })
  text_sanskrit: string;

  @ApiProperty({ example: 'Transliteration' })
  text_transliteration: string;

  @ApiProperty({ example: 'English translation' })
  text_translation_en: string;

  @ApiProperty({ example: 'Hindi translation' })
  text_translation_hi: string;

  @ApiProperty({ example: 'Word meanings' })
  word_meanings_en?: string;

  @ApiProperty({ example: 'Word meanings in Hindi' })
  word_meanings_hi?: string;

  @ApiProperty({ example: 'Commentary' })
  commentary_en?: string;

  @ApiProperty({ example: 'Commentary in Hindi' })
  commentary_hi?: string;
}

export class SearchResultDto {
  @ApiProperty({ type: VerseDto })
  verse: VerseDto;

  @ApiProperty({ example: 0.95 })
  relevanceScore?: number;
}
