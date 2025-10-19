import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { CreateBookmarkDto } from './dto/bookmark.dto';
import { ApiResponseDto, PaginationDto } from '../common/dto/response.dto';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Profile endpoints
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser('id') userId: string) {
    const profile = await this.userService.getProfile(userId);
    return ApiResponseDto.success(profile);
  }

  // Notes endpoints
  @Post('notes')
  @ApiOperation({ summary: 'Create a note' })
  async createNote(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateNoteDto,
  ) {
    const note = await this.userService.createNote(userId, dto);
    return ApiResponseDto.success(note, 'Note created successfully');
  }

  @Get('notes')
  @ApiOperation({ summary: 'Get all user notes' })
  async getNotes(
    @CurrentUser('id') userId: string,
    @Query() pagination: PaginationDto,
  ) {
    const notes = await this.userService.getNotes(userId, pagination);
    return ApiResponseDto.success(notes);
  }

  @Get('notes/:id')
  @ApiOperation({ summary: 'Get note by ID' })
  async getNoteById(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
  ) {
    const note = await this.userService.getNoteById(userId, noteId);
    return ApiResponseDto.success(note);
  }

  @Put('notes/:id')
  @ApiOperation({ summary: 'Update a note' })
  async updateNote(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
    @Body() dto: UpdateNoteDto,
  ) {
    const note = await this.userService.updateNote(userId, noteId, dto);
    return ApiResponseDto.success(note, 'Note updated successfully');
  }

  @Delete('notes/:id')
  @ApiOperation({ summary: 'Delete a note' })
  async deleteNote(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
  ) {
    await this.userService.deleteNote(userId, noteId);
    return ApiResponseDto.success(null, 'Note deleted successfully');
  }

  // Bookmarks endpoints
  @Post('bookmarks')
  @ApiOperation({ summary: 'Add a bookmark' })
  async createBookmark(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateBookmarkDto,
  ) {
    const bookmark = await this.userService.createBookmark(userId, dto);
    return ApiResponseDto.success(bookmark, 'Bookmark added successfully');
  }

  @Get('bookmarks')
  @ApiOperation({ summary: 'Get all user bookmarks' })
  async getBookmarks(
    @CurrentUser('id') userId: string,
    @Query() pagination: PaginationDto,
  ) {
    const bookmarks = await this.userService.getBookmarks(userId, pagination);
    return ApiResponseDto.success(bookmarks);
  }

  @Delete('bookmarks/:id')
  @ApiOperation({ summary: 'Remove a bookmark' })
  async deleteBookmark(
    @CurrentUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    await this.userService.deleteBookmark(userId, bookmarkId);
    return ApiResponseDto.success(null, 'Bookmark removed successfully');
  }
}
