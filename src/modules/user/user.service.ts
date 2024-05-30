import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
// 密码加密
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    // 先查询数据库，看看是否已经存在相同用户名的用户记录
    const existingUser = await this.prisma.user.findMany({
      where: {
        account: createUserDto.account,
      },
    });
    if (existingUser.length) {
      throw new HttpException('账户已经存在', HttpStatus.FORBIDDEN);
    }
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    const res = await this.prisma.user.create({
      data: createUserDto,
    });
    delete res.password;
    return res;
  }

  async findAll() {
    // throw new Error('x');
    // 不返回密码
    // 1.sql不返回密码
    // return await this.prisma.user.findMany({
    //   select: {
    //     userName: true,
    //     account: true,
    //     mobile: true,
    //     email: true,
    //     status: true,
    //     password: false,
    //   },
    // });
    // 2.接口不返回密码
    const res = await this.prisma.user.findMany();
    res.map((i) => {
      delete i.password;
      return i;
    });
    return res;
  }

  async findOne(id: number) {
    // 不返回密码
    // 1.sql不返回密码
    // return await this.prisma.user.findMany({
    //   where: {
    //     id: id,
    //   },
    //   select: {
    //     userName: true,
    //     account: true,
    //     mobile: true,
    //     email: true,
    //     status: true,
    //     password: false,
    //   },
    // });
    // 2.接口不返回密码
    const res = await this.prisma.user.findMany({
      where: {
        id: id,
      },
    });
    res.map((i) => {
      delete i.password;
      return i;
    });
    return res;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 先查询数据库，
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingUser) {
      throw new HttpException('账户不存在', HttpStatus.FORBIDDEN);
    }
    const res = await this.prisma.user.updateMany({
      where: {
        id: id,
      },
      data: updateUserDto,
    });

    const response = {
      message: '更新成功',
      statusCode: 200,
    };
    return response;
  }

  async remove(id: number) {
    return await this.prisma.user.deleteMany({
      where: {
        id: id,
      },
    });
  }
}
