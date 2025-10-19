import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { CreateBookmarkDto } from './dto/bookmark.dto';
import { PaginationDto } from '../common/dto/response.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isPremium: true,
        premiumExpiresAt: true,
        createdAt: true,
        _count: {
          select: {
            notes: true,
            bookmarks: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Notes CRUD
  async createNote(userId: string, dto: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async getNotes(userId: string, pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [notes, total] = await Promise.all([
      this.prisma.note.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.note.count({ where: { userId } }),
    ]);

    return { notes, total, page, limit };
  }

  async getNoteById(userId: string, noteId: string) {
    const note = await this.prisma.note.findFirst({
      where: { id: noteId, userId },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async updateNote(userId: string, noteId: string, dto: UpdateNoteDto) {
    await this.getNoteById(userId, noteId); // Verify ownership

    return this.prisma.note.update({
      where: { id: noteId },
      data: dto,
    });
  }

  async deleteNote(userId: string, noteId: string) {
    await this.getNoteById(userId, noteId); // Verify ownership

    return this.prisma.note.delete({
      where: { id: noteId },
    });
  }

  // Bookmarks CRUD
  async createBookmark(userId: string, dto: CreateBookmarkDto) {
    try {
      return await this.prisma.bookmark.create({
        data: {
          verseRef: dto.verseRef,
          tags: dto.tags || [],
          userId,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Bookmark already exists');
      }
      throw error;
    }
  }

  async getBookmarks(userId: string, pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [bookmarks, total] = await Promise.all([
      this.prisma.bookmark.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.bookmark.count({ where: { userId } }),
    ]);

    return { bookmarks, total, page, limit };
  }

  async deleteBookmark(userId: string, bookmarkId: string) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
