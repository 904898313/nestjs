import { Injectable } from '@nestjs/common';
import { authLoginDto } from './dto/login';
import { UpdateUserDto } from './dto/updatePassword';
import { PrismaService } from '../../prisma.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  // 创建token
  createToken(payload: any): string {
    const token = this.jwtService.sign(payload);
    return token;
  }

  // 登录
  async login(userLoginInfo: authLoginDto) {
    // todo 用户名重复了
    // 验证账号是否存在
    const userInfo = await this.prisma.user.findFirst({
      where: {
        account: userLoginInfo.account,
      },
    });
    if (!userInfo) {
      return {
        message: '用户名不存在',
      };
    }
    // 验证密码是否正确
    const isok = bcryptjs.compareSync(
      userLoginInfo.password,
      userInfo.password,
    );
    if (!isok) {
      return {
        message: '密码错误',
      };
    }
    delete userInfo.password;
    // 生成token
    const token = this.createToken({
      id: userInfo.id,
      account: userInfo.account,
    });
    return {
      data: {
        ...userInfo,
      },
      message: '登录成功了',
      token: token,
    };
  }

  // 更新密码
  async updatePassword(userLoginInfo: UpdateUserDto) {
    console.log(userLoginInfo, 'userLoginInfo');
    return {};
  }
}
