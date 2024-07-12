import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) { }

  // 测试接口
  get() {
    // 自定义 错误状态码 100-999
    // throw new HttpException('错误abc', 999);
    // throw new HttpException('主动抛出错误', HttpStatus.EXPECTATION_FAILED);
    return '成功';
  }

  // create token
  async createToken(payload: any): Promise<string> {
    const token = this.jwtService.sign(payload);
    return token;
  }

  // validate Token
  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      // 处理验证失败
      return {
        message: 'token 验证失败',
      };
    }
  }
}
