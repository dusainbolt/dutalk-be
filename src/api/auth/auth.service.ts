import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ERROR_CODE, IConfigJwt, IConfigRedis } from 'src/common/interfaces';
import { Generate } from 'src/common/utils/generate.utils';
import { JWTUtils } from 'src/common/utils/jwt.utils';
import { Security } from 'src/common/utils/security.utils';
import { MailService } from 'src/mail/mail.service';
import { AppException } from 'src/middleware';
import { AccountHelper } from '../account/account.helper.service';
import { AuthSignInDto, AuthSignUpDto } from './auth.dto';
import { Cache } from 'cache-manager';
@Injectable()
export class AuthService {
  private readonly jwt: IConfigJwt;
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
    private readonly accountHelper: AccountHelper,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
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
    const otpRegister = Generate.otp();
    await this.cacheManager.set(Generate.keyOtp(account.id, account.username), otpRegister, {
      ttl: this.configService.get<IConfigRedis>('redis').ttlOtp,
    });
    await this.mailService.sendOtpRegister(account, otpRegister);
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
