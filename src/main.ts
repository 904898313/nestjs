import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 验证
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cors
  app.enableCors({
    origin: 'http://127.0.0.1:5173',
    // methods: ['POST'],
  });
  // 验证
  // npm i class-validator class-transformer
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
