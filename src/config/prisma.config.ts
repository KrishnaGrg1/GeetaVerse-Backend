import { registerAs } from '@nestjs/config';

export default registerAs('prisma', () => ({
  databaseUrl: process.env.DATABASE_URL,
  logLevel:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
}));
