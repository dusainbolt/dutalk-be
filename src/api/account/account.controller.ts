import { Body, Post } from '@nestjs/common';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { AccountRegistrationDTO } from './account.dto';
import { AccountService } from './account.service';

@IsAuthController(ENTITY_NAME.ACCOUNT, 100, false)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/registration')
  register(@Body() body: AccountRegistrationDTO) {
    // return this.accountService.createAccount(body);
  }
}
