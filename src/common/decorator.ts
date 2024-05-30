// 自定义装饰器
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 测试装饰器
export const Test = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.params, 'request');
    console.log(data, 'data');
    return request;
  },
);
