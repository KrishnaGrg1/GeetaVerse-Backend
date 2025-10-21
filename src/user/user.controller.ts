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
import {
  ApiSuccessResponse,
  ApiErrorResponses,
  ApiCreatedResponse,
} from '../common/decorators/api-response.decorator';
import {
  UserProfileDto,
  NoteDto,
  BookmarkDto,
  PaginatedNotesDto,
  PaginatedBookmarksDto,
} from './dto/user-response.dto';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Profile endpoints
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiSuccessResponse(UserProfileDto, 'User profile retrieved successfully')
  @ApiErrorResponses()
  async getProfile(@CurrentUser('id') userId: string) {
    const profile = await this.userService.getProfile(userId);
    return ApiResponseDto.success(profile);
  }

  // Notes endpoints
  @Post('notes')
  @ApiOperation({ summary: 'Create a note' })
  @ApiCreatedResponse(NoteDto, 'Note created successfully')
  @ApiErrorResponses()
  async createNote(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateNoteDto,
  ) {
    const note = await this.userService.createNote(userId, dto);
    return ApiResponseDto.success(note, 'Note created successfully');
  }

  @Get('notes')
  @ApiOperation({ summary: 'Get all user notes' })
  @ApiSuccessResponse(PaginatedNotesDto, 'Notes retrieved successfully')
  @ApiErrorResponses()
  async getNotes(
    @CurrentUser('id') userId: string,
    @Query() pagination: PaginationDto,
  ) {
    const notes = await this.userService.getNotes(userId, pagination);
    return ApiResponseDto.success(notes);
  }

  @Get('notes/:id')
  @ApiOperation({ summary: 'Get note by ID' })
  @ApiSuccessResponse(NoteDto, 'Note retrieved successfully')
  @ApiErrorResponses()
  async getNoteById(
    @CurrentUser('id') userId: string,
    @Param('id') noteId: string,
  ) {
    const note = await this.userService.getNoteById(userId, noteId);
    return ApiResponseDto.success(note);
  }

  @Put('notes/:id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiSuccessResponse(NoteDto, 'Note updated successfully')
  @ApiErrorResponses()
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
  @ApiSuccessResponse(undefined, 'Note deleted successfully')
  @ApiErrorResponses()
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
  @ApiCreatedResponse(BookmarkDto, 'Bookmark added successfully')
  @ApiErrorResponses()
  async createBookmark(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateBookmarkDto,
  ) {
    const bookmark = await this.userService.createBookmark(userId, dto);
    return ApiResponseDto.success(bookmark, 'Bookmark added successfully');
  }

  @Get('bookmarks')
  @ApiOperation({ summary: 'Get all user bookmarks' })
  @ApiSuccessResponse(PaginatedBookmarksDto, 'Bookmarks retrieved successfully')
  @ApiErrorResponses()
  async getBookmarks(
    @CurrentUser('id') userId: string,
    @Query() pagination: PaginationDto,
  ) {
    const bookmarks = await this.userService.getBookmarks(userId, pagination);
    return ApiResponseDto.success(bookmarks);
  }

  @Delete('bookmarks/:id')
  @ApiOperation({ summary: 'Remove a bookmark' })
  @ApiSuccessResponse(undefined, 'Bookmark removed successfully')
  @ApiErrorResponses()
  async deleteBookmark(
    @CurrentUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    await this.userService.deleteBookmark(userId, bookmarkId);
    return ApiResponseDto.success(null, 'Bookmark removed successfully');
  }
}
