import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  // Global prefix
  const apiPrefix = configService.get('app.apiPrefix') || 'api';
  app.setGlobalPrefix(apiPrefix);

  // CORS
  const corsOrigin = configService.get('app.corsOrigin') || '*';
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('GeetaVerse API')
    .setDescription(
      'Production-ready API for exploring the Bhagavad Gita with AI-powered insights, user authentication, and premium features.',
    )
    .setVersion('1.0')
    .addTag('Authentication', 'User registration and login')
    .addTag('Geeta', 'Browse chapters and verses')
    .addTag('User', 'User profile, notes, and bookmarks')
    .addTag('Payment', 'Premium subscription management')
    .addTag('Admin', 'Admin operations')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Serve OpenAPI JSON at /openapi.json endpoint
  app.use('/openapi.json', (req, res) => {
    res.json(document);
  });

  // ✅ Also write the Swagger JSON file for frontend codegen
  try {
    const outputPath = path.join(process.cwd(), 'openapi.json');
    fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
    logger.log(`📄 Swagger schema generated at: ${outputPath}`);
  } catch (error) {
    logger.error('❌ Failed to write Swagger schema file', error);
  }
  // Start server
  const port = configService.get('app.port') || 3000;
  await app.listen(port);

  logger.log(
    `🚀 GeetaVerse API is running on: http://localhost:${port}/${apiPrefix}`,
  );
  logger.log(`📚 API Documentation: http://localhost:${port}/docs`);
  logger.log(`🌍 Environment: ${configService.get('app.env')}`);
}

bootstrap();
