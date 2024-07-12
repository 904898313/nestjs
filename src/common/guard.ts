// 守卫
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

// 不需要验证token的接口 白名单
const whileList = ['/createToken'];

@Injectable()
export class RolesGuard implements CanActivate {
  // constructor(private readonly jwtService: JwtService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('守卫');
    // console.log(req.headers.token, 'token');
    // console.log(req.url, 'url');
    // console.log(this.jwtService);
    const token = req.headers.token;
    if (whileList.includes(req.url)) {
      return true;
    } else {
      if (!token) {
        throw new HttpException('token 不存在', HttpStatus.FORBIDDEN);
        return false;
      } else {
        try {
          // this.jwtService.verify(token);
          return true;
        } catch (error) {
          // 处理验证失败
          // throw new HttpException('token 验证失败', HttpStatus.FORBIDDEN);
          return false;
        }
      }
    }
  }
}
