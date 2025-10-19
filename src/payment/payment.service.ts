import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private stripe: any; // Stripe instance

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    // Initialize Stripe only if key is provided
    const stripeKey = this.configService.get('app.stripe.secretKey');
    if (stripeKey) {
      try {
        const Stripe = require('stripe');
        this.stripe = new Stripe(stripeKey);
      } catch (error) {
        this.logger.warn('Stripe not initialized - payment features disabled');
      }
    }
  }

  async createCheckoutSession(userId: string) {
    if (!this.stripe) {
      throw new BadRequestException('Payment service not configured');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Create Stripe checkout session (placeholder)
    const session = {
      id: 'session_' + Date.now(),
      url: 'https://checkout.stripe.com/placeholder',
      message:
        'Stripe integration placeholder - configure Stripe keys to enable',
    };

    this.logger.log(`Checkout session created for user: ${userId}`);
    return session;
  }

  async verifyAndActivatePremium(userId: string, sessionId: string) {
    // Placeholder - In production, verify with Stripe
    const premiumExpiresAt = new Date();
    premiumExpiresAt.setFullYear(premiumExpiresAt.getFullYear() + 1); // 1 year premium

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isPremium: true,
        premiumExpiresAt,
      },
    });

    this.logger.log(`Premium activated for user: ${userId}`);
  }
}
