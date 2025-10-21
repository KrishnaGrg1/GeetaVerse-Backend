import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GeetaService } from './geeta.service';
import { ApiResponseDto } from '../common/dto/response.dto';
import {
  ApiSuccessResponse,
  ApiErrorResponses,
} from '../common/decorators/api-response.decorator';
import { ChapterDto, VerseDto, SearchResultDto } from './dto/chapter.dto';

@ApiTags('Geeta')
@Controller('geeta')
export class GeetaController {
  constructor(private readonly geetaService: GeetaService) {}

  @Get('chapters')
  @ApiOperation({ summary: 'Get all chapters' })
  @ApiSuccessResponse(ChapterDto, 'List of all chapters', true)
  @ApiErrorResponses()
  async getAllChapters() {
    const chapters = await this.geetaService.getAllChapters();
    return ApiResponseDto.success(chapters);
  }

  @Get('chapters/:id')
  @ApiOperation({ summary: 'Get chapter by number' })
  @ApiParam({ name: 'id', type: Number })
  @ApiSuccessResponse(ChapterDto, 'Chapter details')
  @ApiErrorResponses()
  async getChapter(@Param('id', ParseIntPipe) id: number) {
    const chapter = await this.geetaService.getChapterByNumber(id);
    return ApiResponseDto.success(chapter);
  }

  @Get('chapters/:chapterId/verses')
  @ApiOperation({ summary: 'Get all verses in a chapter' })
  @ApiParam({ name: 'chapterId', type: Number })
  @ApiSuccessResponse(VerseDto, 'List of verses in chapter', true)
  @ApiErrorResponses()
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
  @ApiSuccessResponse(VerseDto, 'Verse details')
  @ApiErrorResponses()
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
  @ApiSuccessResponse(SearchResultDto, 'Search results', true)
  @ApiErrorResponses()
  async searchVerses(
    @Query('keyword') keyword: string,
    @Query('language') language: 'en' | 'hi' = 'en',
  ) {
    const results = await this.geetaService.searchVerses(keyword, language);
    return ApiResponseDto.success(results);
  }

  @Get('verse-of-the-day')
  @ApiOperation({ summary: 'Get verse of the day' })
  @ApiSuccessResponse(VerseDto, 'Verse of the day')
  @ApiErrorResponses()
  async getVerseOfTheDay() {
    const verse = await this.geetaService.getVerseOfTheDay();
    return ApiResponseDto.success(verse);
  }
}
