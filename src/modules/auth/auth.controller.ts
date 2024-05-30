import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authLoginDto } from './dto/login';
import { UpdateUserDto } from './dto/updatePassword';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() Bodys: authLoginDto) {
    return this.authService.login(Bodys);
  }

  @Patch('updatePassword')
  updatePassword(@Body() Bodys: UpdateUserDto) {
    return this.authService.updatePassword(Bodys);
  }
}
