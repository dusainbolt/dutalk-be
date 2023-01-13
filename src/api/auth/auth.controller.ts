import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { AuthSignUpByWalletDto, AuthSignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@IsAuthController(ENTITY_NAME.AUTH, 0, false)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() body: AuthSignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('/sign-up-by-wallet')
  @HttpCode(HttpStatus.OK)
  async signUpByWallet(@Body() body: AuthSignUpByWalletDto) {
    return this.authService.signUpByWallet(body);
  }
}
