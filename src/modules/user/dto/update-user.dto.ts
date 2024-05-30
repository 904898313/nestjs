import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, IsMobilePhone, IsOptional } from 'class-validator';

// export class UpdateUserDto extends PartialType(CreateUserDto) {
export class UpdateUserDto {
  // `更新接口`的验证继承于`创建接口`
  @IsOptional()
  @IsMobilePhone()
  mobile: string;
  @IsOptional()
  @IsEmail({}, { message: '你传的这个邮箱倒是个锤子邮箱' })
  email: string;
  @IsOptional()
  status: number;
}
