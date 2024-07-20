import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { execute, subscribe } from 'graphql';
import express from 'express';
import { join } from 'path';

async function bootstrap() {
  // Load environment variables from .env file
  dotenv.config();
  console.log('------------------ENV-------------', process.env);
  const app = await NestFactory.create(AppModule);
  // app.use(express.static(join(__dirname, '..', 'public')));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Create HTTP server
  const httpServer = createServer(app.getHttpAdapter().getInstance());

  // Create WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer(
    {
      execute,
      subscribe,
      onConnect: (context) => {
        console.log('Connect');
      },
      onDisconnect: (context, code, reason) => {
        console.log('Disconnect', code, reason);
      },
    },
    wsServer,
  );

  await app.listen(4000);
}
bootstrap();
