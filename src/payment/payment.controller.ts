import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiResponseDto } from '../common/dto/response.dto';

@ApiTags('Payment')
@Controller('payment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-checkout-session')
  @ApiOperation({ summary: 'Create Stripe checkout session for premium' })
  async createCheckoutSession(@CurrentUser('id') userId: string) {
    const session = await this.paymentService.createCheckoutSession(userId);
    return ApiResponseDto.success(session);
  }

  @Post('verify/:sessionId')
  @ApiOperation({ summary: 'Verify payment and activate premium' })
  async verifyPayment(
    @CurrentUser('id') userId: string,
    @Param('sessionId') sessionId: string,
  ) {
    await this.paymentService.verifyAndActivatePremium(userId, sessionId);
    return ApiResponseDto.success(null, 'Premium activated successfully');
  }
}
