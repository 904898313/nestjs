import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { verifyTokenMiddleware, logMiddleware } from './common/middleware';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.secret,
      signOptions: { expiresIn: '1h' }, // 设置 token 过期时间
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyTokenMiddleware)
      .forRoutes('*')
      .apply(logMiddleware)
      .forRoutes('*');
  }
}
