import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/response.dto';

export const ApiSuccessResponse = <TModel extends Type<any>>(
  model?: TModel,
  description = 'Successful response',
  isArray = false,
) => {
  const decorators = [
    ApiExtraModels(ApiResponseDto, ...(model ? [model] : [])),
  ];

  if (model) {
    decorators.push(
      ApiResponse({
        status: 200,
        description,
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiResponseDto) },
            {
              properties: {
                data: isArray
                  ? {
                      type: 'array',
                      items: { $ref: getSchemaPath(model) },
                    }
                  : { $ref: getSchemaPath(model) },
              },
            },
          ],
        },
      }),
    );
  } else {
    decorators.push(
      ApiResponse({
        status: 200,
        description,
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiResponseDto) },
            {
              properties: {
                data: { type: 'object', nullable: true },
              },
            },
          ],
        },
      }),
    );
  }

  return applyDecorators(...decorators);
};

export const ApiCreatedResponse = <TModel extends Type<any>>(
  model: TModel,
  description = 'Resource created successfully',
) => {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto, model),
    ApiResponse({
      status: 201,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};

export const ApiErrorResponses = () => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              success: { type: 'boolean', example: false },
              error: { type: 'object' },
            },
          },
        ],
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              success: { type: 'boolean', example: false },
              error: { type: 'object' },
            },
          },
        ],
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              success: { type: 'boolean', example: false },
              error: { type: 'object' },
            },
          },
        ],
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              success: { type: 'boolean', example: false },
              error: { type: 'object' },
            },
          },
        ],
      },
    }),
  );
};
