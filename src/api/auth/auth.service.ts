import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ERROR_CODE } from 'src/common/interfaces';
import { JWTUtils } from 'src/common/utils/jwt.utils';
import { Security } from 'src/common/utils/security.utils';
import { AppException } from 'src/middleware';
import { AccountHelper } from '../account/account.helper.service';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly accountHelper: AccountHelper) {}

  async signUp(body: any) {
    const { email, username, fullName } = body;
    // check exist
    const isExistUser = await this.accountHelper.findAccountWhere([{ email }, { username }]);
    if (isExistUser) {
      throw new AppException(ERROR_CODE.ACCOUNT_USERNAME_EMAIL_ALREADY_REGISTER);
    }
    const password = await Security.hashBcrypt(body.password);
    const account = await this.accountHelper.insertAccount({ email, username, password, fullName });
    const accountJWT = JWTUtils.generateAuthToken(account);
    return { token: this.jwtService.sign(accountJWT), account };
  }
}
