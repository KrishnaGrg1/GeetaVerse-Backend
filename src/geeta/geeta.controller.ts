import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GeetaService } from './geeta.service';
import { ApiResponseDto } from '../common/dto/response.dto';

@ApiTags('Geeta')
@Controller('geeta')
export class GeetaController {
  constructor(private readonly geetaService: GeetaService) {}

  @Get('chapters')
  @ApiOperation({ summary: 'Get all chapters' })
  async getAllChapters() {
    const chapters = await this.geetaService.getAllChapters();
    return ApiResponseDto.success(chapters);
  }

  @Get('chapters/:id')
  @ApiOperation({ summary: 'Get chapter by number' })
  @ApiParam({ name: 'id', type: Number })
  async getChapter(@Param('id', ParseIntPipe) id: number) {
    const chapter = await this.geetaService.getChapterByNumber(id);
    return ApiResponseDto.success(chapter);
  }

  @Get('chapters/:chapterId/verses')
  @ApiOperation({ summary: 'Get all verses in a chapter' })
  @ApiParam({ name: 'chapterId', type: Number })
  async getAllVersesInChapter(
    @Param('chapterId', ParseIntPipe) chapterId: number,
  ) {
    const verses = await this.geetaService.getAllVersesForChapter(chapterId);
    return ApiResponseDto.success(verses);
  }

  @Get('chapters/:chapterId/verses/:verseId')
  @ApiOperation({ summary: 'Get specific verse' })
  @ApiParam({ name: 'chapterId', type: Number })
  @ApiParam({ name: 'verseId', type: Number })
  async getVerse(
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Param('verseId', ParseIntPipe) verseId: number,
  ) {
    const verse = await this.geetaService.getVerse(chapterId, verseId);
    return ApiResponseDto.success(verse);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search verses by keyword' })
  @ApiQuery({ name: 'keyword', required: true })
  @ApiQuery({ name: 'language', required: false, enum: ['en', 'hi'] })
  async searchVerses(
    @Query('keyword') keyword: string,
    @Query('language') language: 'en' | 'hi' = 'en',
  ) {
    const results = await this.geetaService.searchVerses(keyword, language);
    return ApiResponseDto.success(results);
  }

  @Get('verse-of-the-day')
  @ApiOperation({ summary: 'Get verse of the day' })
  async getVerseOfTheDay() {
    const verse = await this.geetaService.getVerseOfTheDay();
    return ApiResponseDto.success(verse);
  }
}
