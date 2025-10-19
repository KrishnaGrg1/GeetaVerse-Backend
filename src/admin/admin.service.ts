import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/response.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isPremium: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: {
              notes: true,
              bookmarks: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return { users, total, page, limit };
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isPremium: true,
        premiumExpiresAt: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            notes: true,
            bookmarks: true,
            sessions: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async toggleUserStatus(userId: string) {
    const user = await this.getUserById(userId);

    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
    });
  }

  async grantPremium(userId: string, months: number = 12) {
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + months);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isPremium: true,
        premiumExpiresAt: expiresAt,
      },
    });
  }

  async deleteUser(userId: string) {
    await this.getUserById(userId);

    // Cascade delete will handle related records
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async getStats() {
    const [totalUsers, activeUsers, premiumUsers, totalNotes, totalBookmarks] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.user.count({ where: { isActive: true } }),
        this.prisma.user.count({ where: { isPremium: true } }),
        this.prisma.note.count(),
        this.prisma.bookmark.count(),
      ]);

    return {
      totalUsers,
      activeUsers,
      premiumUsers,
      totalNotes,
      totalBookmarks,
    };
  }
}
