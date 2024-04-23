// 验证
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;
  @IsString()
  account: string;
  @IsString()
  password: string;
  @IsString()
  mobile: string;
  @IsEmail()
  email: string;
  status: number;
}
