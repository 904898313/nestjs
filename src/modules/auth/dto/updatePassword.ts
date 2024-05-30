// import { PartialType } from '@nestjs/mapped-types';
// import { authLoginDto } from './login';
import { IsString } from 'class-validator';

// export class UpdateUserDto extends PartialType(authLoginDto) {
export class UpdateUserDto {
  // `更新接口`的验证继承于`创建接口`
  @IsString()
  account: string;
  @IsString()
  password: string;
  @IsString()
  newPassword: string;
}
