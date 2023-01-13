import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './api/account/account.module';
import { AppController } from './app.controller';
import { Log } from './entities/log.entity';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    // Service module
    SharedModule,

    // Entity module
    TypeOrmModule.forFeature([Log]),
    AccountModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
