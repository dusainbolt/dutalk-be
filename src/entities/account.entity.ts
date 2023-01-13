import { AccountRole, AccountStatus } from 'src/api/account/account.interface';
import { ENTITY_NAME } from 'src/common/constant';
import { AbstractEntity } from 'src/common/interfaces';
import { Column, Entity } from 'typeorm';

@Entity(ENTITY_NAME.ACCOUNT)
export class Account extends AbstractEntity {
  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'username', unique: true })
  username: string;

  @Column({ type: 'varchar', name: 'full_name', default: null })
  fullName: string;

  @Column({ type: 'varchar', name: 'password', default: null })
  password: string;

  @Column({ type: 'enum', enum: Object.values(AccountStatus), default: AccountStatus.NOT_VERIFY })
  status: AccountStatus;

  @Column({ type: 'enum', enum: Object.values(AccountRole), default: AccountRole.USER })
  role: AccountRole;
}
