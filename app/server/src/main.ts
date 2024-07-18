import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Load environment variables from .env file
  dotenv.config();
  console.log(process.env.MIKRO_ORM_DB_PASSWORD);
  console.log(process.env.MIKRO_ORM_DB_NAME);
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
