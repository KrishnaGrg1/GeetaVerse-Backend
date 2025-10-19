import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Track verse views (can be extended to store analytics)
   */
  async trackVerseView(verseRef: string, userId?: string): Promise<void> {
    this.logger.log(`Verse viewed: ${verseRef} by user: ${userId || 'guest'}`);
    // Can be extended to store in analytics table
  }

  /**
   * Get popular verses based on bookmarks
   */
  async getPopularVerses(limit = 10) {
    const popularVerses = await this.prisma.bookmark.groupBy({
      by: ['verseRef'],
      _count: {
        verseRef: true,
      },
      orderBy: {
        _count: {
          verseRef: 'desc',
        },
      },
      take: limit,
    });

    return popularVerses.map((verse) => ({
      verseRef: verse.verseRef,
      bookmarkCount: verse._count.verseRef,
    }));
  }

  /**
   * Get user engagement stats
   */
  async getUserEngagementStats(userId: string) {
    const [noteCount, bookmarkCount] = await Promise.all([
      this.prisma.note.count({ where: { userId } }),
      this.prisma.bookmark.count({ where: { userId } }),
    ]);

    return {
      totalNotes: noteCount,
      totalBookmarks: bookmarkCount,
      engagementScore: noteCount + bookmarkCount,
    };
  }

  /**
   * Get platform-wide statistics
   */
  async getPlatformStats() {
    const [totalUsers, activeUsers, premiumUsers, totalNotes, totalBookmarks] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.user.count({ where: { isActive: true } }),
        this.prisma.user.count({ where: { isPremium: true } }),
        this.prisma.note.count(),
        this.prisma.bookmark.count(),
      ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        premium: premiumUsers,
      },
      content: {
        totalNotes,
        totalBookmarks,
      },
      engagement: {
        averageNotesPerUser: totalUsers > 0 ? totalNotes / totalUsers : 0,
        averageBookmarksPerUser:
          totalUsers > 0 ? totalBookmarks / totalUsers : 0,
      },
    };
  }
}
