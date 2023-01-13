import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { AccountModule } from '../account/account.module';
@Module({
  imports: [
    PassportModule,
    AccountModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('jwt.secretKey'),
          signOptions: {
            expiresIn: config.get('jwt.expireIns'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
