import { Get, Query } from '@nestjs/common';
import { IsAuthController } from './common/decorators';
import { ERROR_CODE } from './common/interfaces';
import { AppException } from './middleware';

@IsAuthController(`healthcheck`, 100, false)
export class AppController {
  @Get('/')
  getHello(@Query() query: { address: string }): any {
    if (!query.address) throw new AppException(ERROR_CODE.ERROR_CODE_TEST);
    return 'thing';
  }
}
