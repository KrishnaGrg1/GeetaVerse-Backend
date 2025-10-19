import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  error?: any;

  @ApiProperty()
  timestamp: string;

  constructor(success: boolean, data?: T, message?: string, error?: any) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T, message?: string): ApiResponseDto<T> {
    return new ApiResponseDto(true, data, message);
  }

  static error(error: any, message?: string): ApiResponseDto {
    return new ApiResponseDto(false, null, message, error);
  }
}

export class PaginatedResponseDto<T> extends ApiResponseDto<{
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  constructor(items: T[], total: number, page: number, limit: number) {
    const totalPages = Math.ceil(total / limit);
    super(true, {
      items,
      total,
      page,
      limit,
      totalPages,
    });
  }
}

export class PaginationDto {
  @ApiProperty({ default: 1, required: false })
  page?: number = 1;

  @ApiProperty({ default: 10, required: false })
  limit?: number = 10;
}
