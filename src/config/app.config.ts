import { registerAs } from '@nestjs/config';
import { EnvConfig } from './env.validation';

export default registerAs('app', () => {
  const config = process.env as unknown as EnvConfig;

  return {
    env: config.NODE_ENV || 'development',
    port: parseInt(config.PORT, 10) || 3000,
    apiPrefix: config.API_PREFIX || 'api',
    corsOrigin: config.CORS_ORIGIN || '*',

    jwt: {
      secret: config.JWT_SECRET,
      expiresIn: config.JWT_EXPIRES_IN || '15m',
      refreshSecret: config.JWT_REFRESH_SECRET,
      refreshExpiresIn: config.JWT_REFRESH_EXPIRES_IN || '7d',
    },

    throttle: {
      ttl: parseInt(config.THROTTLE_TTL, 10) || 60,
      limit: parseInt(config.THROTTLE_LIMIT, 10) || 100,
    },

    stripe: {
      secretKey: config.STRIPE_SECRET_KEY,
      webhookSecret: config.STRIPE_WEBHOOK_SECRET,
      premiumPriceId: config.STRIPE_PREMIUM_PRICE_ID,
    },

    openai: {
      apiKey: config.OPENAI_API_KEY,
      model: config.OPENAI_MODEL || 'tngtech/deepseek-r1t2-chimera:free',
      siteUrl: config.OPENAI_SITE_URL || 'https://geetaverse.com',
      siteName: config.OPENAI_SITE_NAME || 'GeetaVerse',
    },
  };
});
