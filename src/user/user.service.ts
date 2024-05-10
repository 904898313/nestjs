import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        userName: true,
        account: true,
        mobile: true,
        email: true,
        status: true,
        password: false,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findMany({
      where: {
        id: id,
      },
      select: {
        userName: true,
        account: true,
        mobile: true,
        email: true,
        status: true,
        password: false,
      },
    });
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
