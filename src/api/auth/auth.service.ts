import { Injectable } from '@nestjs/common';
import { ERROR_CODE } from 'src/common/interfaces';
import { Security } from 'src/common/utils/security.utils';
import { AppException } from 'src/middleware';
import { AccountHelper } from '../account/account.helper.service';
import { AccountStatus } from '../account/account.interface';
import {
  AuthForgotPasswordDto,
  AuthResetPassword,
  AuthSignInDto,
  AuthSignUpDto,
  AuthVerifyAccountDTO,
} from './auth.dto';
import { AuthHelper } from './auth.helper.service';
@Injectable()
export class AuthService {
  constructor(private readonly accountHelper: AccountHelper, private readonly authHelper: AuthHelper) {}

  async signUp(body: AuthSignUpDto) {
    const { email, username, fullName } = body;
    // check exist
    const findAccount = await this.accountHelper.findAccountWhere([{ email }, { username }]);
    this.authHelper.isExistEmailOrUsername(findAccount);
    // hash password
    const password = await Security.hashBcrypt(body.password);
    // create account, send mail and return account
    const account = await this.accountHelper.insertAccount({ email, username, password, fullName });
    await this.authHelper.generateOtpConfirmAndSendMail(account);
    return account;
  }

  async signIn(body: AuthSignInDto) {
    const { credential } = body;
    const account = await this.accountHelper.findAccountWhere([{ email: credential }, { username: credential }]);
    // check account
    this.accountHelper.isExistAccount(account);
    // check password
    await this.authHelper.isMatchPassword(account, body.password);
    // if sign but account not verify
    if (account.status === AccountStatus.NOT_VERIFY) {
      await this.authHelper.generateOtpConfirmAndSendMail(account);
      throw new AppException(ERROR_CODE.ACCOUNT_NOT_VERIFIED);
    }
    // return jwt
    return this.authHelper.signJWT(account);
  }

  async verifyAccount(body: AuthVerifyAccountDTO) {
    const account = await this.accountHelper.findAccount({ email: body.email });
    // check account
    this.accountHelper.isExistAccount(account);
    this.accountHelper.isAccountNotVerify(account);
    // check otp
    await this.authHelper.verifyOtpRegister(account, body.otp);
    // update user and return jwt
    account.status = AccountStatus.ACTIVE;
    await account.save();
    return this.authHelper.signJWT(account);
  }

  async forgotPassword(body: AuthForgotPasswordDto) {
    const { credential } = body;
    const account = await this.accountHelper.findAccountWhere([{ email: credential }, { username: credential }]);
    // check account
    this.accountHelper.isExistAccount(account);
    await this.authHelper.generateOtpForgotPasswordAndSendMail(account);
    return true;
  }

  async resetPassword(body: AuthResetPassword) {
    const { credential } = body;
    const account = await this.accountHelper.findAccountWhere([{ email: credential }, { username: credential }]);
    // check account
    this.accountHelper.isExistAccount(account);
    // check otp
    await this.authHelper.verifyOtpForgotPassword(account, body.otp);
    await this.authHelper.updatedAccountResetPassword(account, body.password);
    return true;
  }
}
