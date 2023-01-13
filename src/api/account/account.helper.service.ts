import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class AccountHelper {
  constructor(@InjectRepository(Account) private accountRepo: Repository<Account>) {}

  async findAccount(filter: FindOptionsWhere<Account>): Promise<Account> {
    return await this.accountRepo.findOneBy(filter);
  }

  async insertAccount(data: DeepPartial<Account>): Promise<Account> {
    return await this.accountRepo.save(data);
  }
}
