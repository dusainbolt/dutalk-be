import { AccountStatus } from 'src/api/account/account.interface';
import { ENTITY_NAME } from 'src/common/constant';
import { AbstractEntity } from 'src/common/interfaces';
import { Column, Entity } from 'typeorm';

@Entity(ENTITY_NAME.ACCOUNT)
export class Account extends AbstractEntity {
  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'phone_number', unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', name: 'password', default: null })
  password: string;

  @Column({ type: 'enum', enum: Object.values(AccountStatus), default: AccountStatus.INACTIVE })
  status: AccountStatus;
}
