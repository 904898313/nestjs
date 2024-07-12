import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ErrorFilter } from './common/filter';
import { RolesGuard } from './common/guard';
import { loggerInterceptor } from './common/Interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // cors 开启跨域资源共享
  app.enableCors({
    origin: 'http://127.0.0.1:5173',
    // methods: ['POST'],
  });

  // 执行顺序
  // 1.收到请求 2.中间件 3.守卫 4.拦截器 5.管道 6.控制器controller 7.服务service 8.异常过滤器 9.服务器响应

  // 注册全局守卫
  app.useGlobalGuards(new RolesGuard());

  // 注册全局拦截器
  app.useGlobalInterceptors(new loggerInterceptor());

  // 注册全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true, // 给定属性的验证将在遇到第一个错误后停止
      // -排除属性
      whitelist: true, // 排除掉非装饰器验证的属性
      // forbidNonWhitelisted: true, // 禁止无装饰器验证的数据通过
      // -类型转换
      // transform: true, // 是否自动转换输入数据类型。
      // -跳过指定类型的验证
      // skipUndefinedProperties: true, // 跳过验证对象中 undefined 的所有属性的验证。  没有该字段即为undefined
      // skipNullProperties: true, // 跳过验证对象中所有为 null 的验证。
      // -验证错误 响应
      errorHttpStatusCode: HttpStatus.BAD_REQUEST, // 此设置允许你指定在发生错误时将使用哪种异常类型。默认情况下它抛出 HttpStatus.BAD_REQUEST 即400
      // dismissDefaultMessages: true, // 验证将不会使用默认消息。如果未明确设置，错误消息始终为 undefined。
    }),
  );

  // 注册全局异常过滤器
  app.useGlobalFilters(new ErrorFilter());

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Your API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      // 配置...
    },
  });

  // 配置静态资源目录 @nestjs/platform-express
  app.useStaticAssets('public', {
    prefix: '/static/', // 配置虚拟目录
  });

  await app.listen(3000);
}
bootstrap();
