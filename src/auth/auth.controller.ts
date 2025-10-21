import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  AuthResponseDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiResponseDto } from '../common/dto/response.dto';
import {
  ApiSuccessResponse,
  ApiErrorResponses,
  ApiCreatedResponse,
} from '../common/decorators/api-response.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse(AuthResponseDto, 'User registered successfully')
  @ApiErrorResponses()
  async register(
    @Body() dto: RegisterDto,
  ): Promise<ApiResponseDto<AuthResponseDto>> {
    const result = await this.authService.register(dto);
    return ApiResponseDto.success(result, 'User registered successfully');
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiSuccessResponse(AuthResponseDto, 'Login successful')
  @ApiErrorResponses()
  async login(@Body() dto: LoginDto): Promise<ApiResponseDto<AuthResponseDto>> {
    const result = await this.authService.login(dto);
    return ApiResponseDto.success(result, 'Login successful');
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiSuccessResponse(AuthResponseDto, 'Token refreshed successfully')
  @ApiErrorResponses()
  async refresh(
    @Body() dto: RefreshTokenDto,
  ): Promise<ApiResponseDto<AuthResponseDto>> {
    const result = await this.authService.refreshToken(dto.refreshToken);
    return ApiResponseDto.success(result, 'Token refreshed successfully');
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiSuccessResponse(undefined, 'Logout successful')
  @ApiErrorResponses()
  async logout(
    @CurrentUser('id') userId: string,
    @Body() dto: RefreshTokenDto,
  ): Promise<ApiResponseDto<null>> {
    await this.authService.logout(userId, dto.refreshToken);
    return ApiResponseDto.success(null, 'Logout successful');
  }
}
