import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) { }

  get() {
    // 自定义 错误状态码 100-999
    // throw new HttpException('错误abc', 999);
    throw new HttpException('错误abc', HttpStatus.EXPECTATION_FAILED);
    // return '成功';
  }

  async createToken(payload: any): Promise<string> {
    const token = this.jwtService.sign(payload);
    return token;
  }

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
