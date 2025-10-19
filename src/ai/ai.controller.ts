import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiProperty,
} from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponseDto } from '../common/dto/response.dto';

class AskQuestionDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  context?: string;
}

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('insight/:verseRef')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get AI-powered insight for a verse (Premium)' })
  @ApiParam({ name: 'verseRef', example: 'BG2.47' })
  @ApiQuery({ name: 'verseText', required: true })
  async getVerseInsight(
    @Param('verseRef') verseRef: string,
    @Query('verseText') verseText: string,
  ) {
    const insight = await this.aiService.getVerseInsight(verseRef, verseText);
    return ApiResponseDto.success(
      { insight },
      'Insight generated successfully',
    );
  }

  @Get('summary/:chapterNumber')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get AI-powered chapter summary (Premium)' })
  @ApiParam({ name: 'chapterNumber', type: Number })
  @ApiQuery({ name: 'chapterName', required: true })
  @ApiQuery({ name: 'chapterSummary', required: true })
  async getChapterSummary(
    @Param('chapterNumber') chapterNumber: number,
    @Query('chapterName') chapterName: string,
    @Query('chapterSummary') chapterSummary: string,
  ) {
    const summary = await this.aiService.generateSummary(
      +chapterNumber,
      chapterName,
      chapterSummary,
    );
    return ApiResponseDto.success(
      { summary },
      'Summary generated successfully',
    );
  }

  @Get('daily-reflection')
  @ApiOperation({ summary: 'Get daily AI-powered reflection' })
  @ApiQuery({ name: 'verseText', required: true })
  async getDailyReflection(@Query('verseText') verseText: string) {
    const reflection = await this.aiService.getDailyReflection(verseText);
    return ApiResponseDto.success(
      { reflection },
      'Reflection generated successfully',
    );
  }

  @Post('ask')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ask a question about the Bhagavad Gita' })
  async askQuestion(@Body() dto: AskQuestionDto) {
    const answer = await this.aiService.askQuestion(dto.question, dto.context);
    return ApiResponseDto.success({ answer }, 'Question answered successfully');
  }
}
