import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { AccountService } from './account.service';

@IsAuthController(ENTITY_NAME.ACCOUNT, 100, false)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
}
