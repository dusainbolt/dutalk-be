import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ERROR_CODE, IConfigJwt } from 'src/common/interfaces';
import { JWTUtils } from 'src/common/utils/jwt.utils';
import { Security } from 'src/common/utils/security.utils';
import { AppException } from 'src/middleware';
import { AccountHelper } from '../account/account.helper.service';
import { AuthSignInDto, AuthSignUpDto } from './auth.dto';
@Injectable()
export class AuthService {
  private readonly jwt: IConfigJwt;
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountHelper: AccountHelper,
    private readonly configService: ConfigService,
  ) {
    this.jwt = this.configService.get('jwt');
  }

  async signUp(body: AuthSignUpDto) {
    const { email, username, fullName } = body;
    // check exist
    const userByEmailOrUsername = await this.accountHelper.findAccountWhere([{ email }, { username }]);
    if (userByEmailOrUsername) {
      throw new AppException(ERROR_CODE.ACCOUNT_USERNAME_EMAIL_ALREADY_REGISTER);
    }
    const password = await Security.hashBcrypt(body.password);
    const account = await this.accountHelper.insertAccount({ email, username, password, fullName });
    return account;
  }

  async signIn(body: AuthSignInDto) {
    const { credential } = body;
    const account = await this.accountHelper.findAccountWhere([{ email: credential }, { username: credential }]);
    if (!account) {
      throw new AppException(ERROR_CODE.ACCOUNT_NOT_FOUND);
    }
    if (!(await Security.compareBcrypt(body.password, account.password))) {
      throw new AppException(ERROR_CODE.AUTH_PASSWORD_INCORRECT);
    }
    const accountJWT = JWTUtils.generateAuthToken(account);
    return this.jwtService.sign(accountJWT, { expiresIn: this.jwt.expireIns });
  }
}
