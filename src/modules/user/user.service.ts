

/*
 * @Author: yangchenguang
 * @Description: 
 * @Date: 2024-04-23 16:09:57
 * @LastEditors: yangchenguang
 * @LastEditTime: 2024-05-30 12:07:16
 */

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
// 密码加密
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
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
    return await this.prisma.user.updateMany({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.deleteMany({
      where: {
        id: id,
      },
    });
  }
}
