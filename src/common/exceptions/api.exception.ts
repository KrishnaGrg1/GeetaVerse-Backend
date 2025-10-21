// src/common/exceptions/api.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom API Exception similar to Flask's ApiException
 * Supports i18n message keys and context for message formatting
 */
export class ApiException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    context?: Record<string, any>,
  ) {
    // Translate message (implement your translation logic)
    const translatedMessage = ApiException.translate(message, context);

    super(
      {
        success: false,
        message: translatedMessage,
        statusCode,
        context,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }

  /**
   * Helper function for translation
   * Replace with actual i18n implementation (e.g., i18next, nestjs-i18n)
   */
  private static translate(key: string, context?: Record<string, any>): string {
    // For now, return the key and format with context
    // TODO: Integrate with i18n library
    let message = key;

    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        message = message.replace(`{${key}}`, String(value));
      });
    }

    return message;
  }
}
