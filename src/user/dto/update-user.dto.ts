import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  userName: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  status: number;
}
