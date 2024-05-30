import { IsString } from 'class-validator';

export class authLoginDto {
  @IsString()
  account: string;
  @IsString()
  password: string;
}
