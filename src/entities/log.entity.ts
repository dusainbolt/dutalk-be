import { ENTITY_NAME } from 'src/common/constant';
import { AbstractEntity } from 'src/common/interfaces';
import { Column, Entity } from 'typeorm';

@Entity(ENTITY_NAME.LOG)
export class Log extends AbstractEntity {
  @Column({ type: 'varchar', name: 'request_path' })
  requestPath: string;

  @Column({ type: 'int', name: 'user_id', nullable: true })
  userId: number;

  @Column({ type: 'text', name: 'input', nullable: true })
  input: string;

  @Column({ type: 'text', name: 'error', nullable: true })
  error: string;
}
