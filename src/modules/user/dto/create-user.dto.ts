// 验证
import { IsString, IsEmail, IsMobilePhone } from 'class-validator';

export class CreateUserDto {
  @IsString()
  account: string;
  @IsString()
  password: string;
  @IsMobilePhone()
  mobile: string;
  @IsEmail({}, { message: '你传的这个邮箱倒是个锤子邮箱' })
  email: string;
  status: number;
  createTime: string;
  updateTime: string;
}
