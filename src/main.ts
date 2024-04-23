import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 验证
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 验证
  // npm i class-validator class-transformer
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
