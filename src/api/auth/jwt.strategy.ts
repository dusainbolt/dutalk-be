import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { AccountService } from '../account/account.service';
// import { AuthService } from './auth.service';
// import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly accountService: AccountService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication || request?.headers?.authorization?.split(`Bearer `)[1],
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('jwt.secretKey'),
    } as StrategyOptions);
  }

  async validate(payload: any) {
    // const user = await this.userService.findOne({ _id: payload._id });
    // return user;
  }
}
