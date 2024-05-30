// 自定义中间件
import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// 记录日志 函数中间件
export function logMiddleware(req: Request, res: Response, next: NextFunction) {
  // TODO: 记录日志
  console.log('log');
  next();
}

// 验证token 类中间件
@Injectable()
export class verifyTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('verifyToken');
    if (!req.headers.token) {
      throw new HttpException(
        'token身份验证失败,请重新登录',
        HttpStatus.FORBIDDEN,
      );
    }
    next();
  }
}
