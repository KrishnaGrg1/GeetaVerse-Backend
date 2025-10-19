import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiResponseDto, PaginationDto } from '../common/dto/response.dto';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(@Query() pagination: PaginationDto) {
    const users = await this.adminService.getAllUsers(pagination);
    return ApiResponseDto.success(users);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  async getUserById(@Param('id') userId: string) {
    const user = await this.adminService.getUserById(userId);
    return ApiResponseDto.success(user);
  }

  @Put('users/:id/toggle-status')
  @ApiOperation({ summary: 'Toggle user active status' })
  async toggleUserStatus(@Param('id') userId: string) {
    const user = await this.adminService.toggleUserStatus(userId);
    return ApiResponseDto.success(user, 'User status updated');
  }

  @Put('users/:id/grant-premium')
  @ApiOperation({ summary: 'Grant premium to user' })
  async grantPremium(
    @Param('id') userId: string,
    @Body('months') months: number = 12,
  ) {
    const user = await this.adminService.grantPremium(userId, months);
    return ApiResponseDto.success(user, 'Premium granted successfully');
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user' })
  async deleteUser(@Param('id') userId: string) {
    await this.adminService.deleteUser(userId);
    return ApiResponseDto.success(null, 'User deleted successfully');
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get platform statistics' })
  async getStats() {
    const stats = await this.adminService.getStats();
    return ApiResponseDto.success(stats);
  }
}
