import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { FileReaderUtil } from '../common/utils/file-reader.util';

export interface Chapter {
  chapter_number: number;
  verses_count: number;
  name: string;
  translation: string;
  transliteration: string;
  meaning: {
    en: string;
    hi: string;
  };
  summary: {
    en: string;
    hi: string;
  };
}

export interface Verse {
  _id: string;
  chapter: number;
  verse: number;
  slok: string;
  transliteration: string;
  tej?: any;
  siva?: any;
  purohit?: any;
  chinmay?: any;
  san?: any;
  adi?: any;
  gambir?: any;
  madhav?: any;
  anand?: any;
  rams?: any;
  raman?: any;
}

@Injectable()
export class GeetaService {
  private readonly logger = new Logger(GeetaService.name);
  private readonly CHAPTER_PATH = 'src/geeta/chapter';
  private readonly SLOK_PATH = 'src/geeta/slok';

  constructor(private readonly fileReader: FileReaderUtil) {}

  /**
   * Get all chapters metadata
   */
  async getAllChapters(): Promise<Chapter[]> {
    const chapters: Chapter[] = [];

    for (let i = 1; i <= 18; i++) {
      const filePath = `${this.CHAPTER_PATH}/bhagavadgita_chapter_${i}.json`;
      try {
        const chapter = await this.fileReader.readJsonFile<Chapter>(filePath);
        chapters.push(chapter);
      } catch (error) {
        this.logger.error(`Failed to load chapter ${i}`, error);
      }
    }

    return chapters;
  }

  /**
   * Get a specific chapter by number
   */
  async getChapterByNumber(chapterNumber: number): Promise<Chapter> {
    if (chapterNumber < 1 || chapterNumber > 18) {
      throw new NotFoundException('Chapter number must be between 1 and 18');
    }

    const filePath = `${this.CHAPTER_PATH}/bhagavadgita_chapter_${chapterNumber}.json`;
    return this.fileReader.readJsonFile<Chapter>(filePath);
  }

  /**
   * Get a specific verse
   */
  async getVerse(chapterNumber: number, verseNumber: number): Promise<Verse> {
    const filePath = `${this.SLOK_PATH}/bhagavadgita_chapter_${chapterNumber}_slok_${verseNumber}.json`;

    try {
      return await this.fileReader.readJsonFile<Verse>(filePath);
    } catch (error) {
      throw new NotFoundException(
        `Verse ${verseNumber} not found in chapter ${chapterNumber}`,
      );
    }
  }

  /**
   * Get all verses for a chapter
   */
  async getAllVersesForChapter(chapterNumber: number): Promise<Verse[]> {
    const chapter = await this.getChapterByNumber(chapterNumber);
    const verses: Verse[] = [];

    for (let i = 1; i <= chapter.verses_count; i++) {
      try {
        const verse = await this.getVerse(chapterNumber, i);
        verses.push(verse);
      } catch (error) {
        this.logger.warn(`Verse ${i} not found in chapter ${chapterNumber}`);
      }
    }

    return verses;
  }

  /**
   * Search verses by keyword
   */
  async searchVerses(
    keyword: string,
    language: 'en' | 'hi' = 'en',
  ): Promise<Verse[]> {
    const allVerses: Verse[] = [];

    // Load all verses (this can be optimized with a database)
    for (let chapter = 1; chapter <= 18; chapter++) {
      try {
        const verses = await this.getAllVersesForChapter(chapter);
        allVerses.push(...verses);
      } catch (error) {
        this.logger.error(
          `Failed to load chapter ${chapter} for search`,
          error,
        );
      }
    }

    // Simple keyword search
    const searchLower = keyword.toLowerCase();
    return allVerses.filter((verse) => {
      const slokLower = verse.slok.toLowerCase();
      const transliterationLower = verse.transliteration.toLowerCase();

      return (
        slokLower.includes(searchLower) ||
        transliterationLower.includes(searchLower)
      );
    });
  }

  /**
   * Get random verse of the day
   */
  async getVerseOfTheDay(): Promise<Verse> {
    // Use date as seed for consistency
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        86400000,
    );

    // Total verses in Gita: 700
    const verseIndex = dayOfYear % 700;

    let count = 0;
    for (let chapter = 1; chapter <= 18; chapter++) {
      const chapterData = await this.getChapterByNumber(chapter);
      const chapterVerseCount = chapterData.verses_count;

      if (count + chapterVerseCount > verseIndex) {
        const verseNum = verseIndex - count + 1;
        return this.getVerse(chapter, verseNum);
      }

      count += chapterVerseCount;
    }

    // Fallback to first verse
    return this.getVerse(1, 1);
  }
}
