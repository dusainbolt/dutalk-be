import { Global, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { Env, LogLevel } from 'src/common/interfaces';
import { configuration } from 'src/configs';
import { TypeOrmConfigService } from 'src/configs/database';
import { v4 } from 'uuid';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      encoding: 'utf-8',
      envFilePath: [
        process.env.NODE_ENV && process.env.NODE_ENV !== 'default' ? `.env.${process.env.NODE_ENV}` : `.env`,
        `.env`,
      ],
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => v4(),
        transport:
          process.env.NODE_ENV === Env.DEFAULT ? { target: 'pino-pretty', options: { colorize: true } } : undefined,
        serializers: {
          req(req) {
            req.body = req.raw.body;
            return req;
          },
        },
        level: process.env.NODE_ENV !== Env.PRODUCTION ? LogLevel.DEBUG : LogLevel.INFO,
        useLevel: process.env.NODE_ENV !== Env.PRODUCTION ? LogLevel.DEBUG : LogLevel.INFO,
        redact: ['payload.user.password'],
      },
      forRoutes: ['*'],
      exclude: [
        { method: RequestMethod.ALL, path: '/v1/healthcheck' },
        { method: RequestMethod.ALL, path: '/api-docs' },
      ],
    }),
  ],
})
export class SharedModule {}
