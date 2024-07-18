import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Load environment variables from .env file
  dotenv.config();
  console.log(process.env.MIKRO_ORM_DB_PASSWORD);
  console.log(process.env.MIKRO_ORM_DB_NAME);
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
