import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  get(@Body() body) {
    console.log(body, 'body1');
    return this.appService.get();
  }

  @Get('createToken')
  createToken(payload = { username: 'user123', role: 'admin' }) {
    console.log(payload, 'payload');
    return this.appService.createToken(payload);
  }

  @Get('validateToken')
  validateToken(
    payload = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJOYW1lIjoiYWRtaW4iLCJhY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3MTU4NTUzNDIsImV4cCI6MTcxNTg1ODk0Mn0.M-0XlmHXqjuYmswF-km3XeUL_0N5aPdHPy7MCDJ4kEY'
  ): any {
    return this.appService.validateToken(payload);
  }
}
