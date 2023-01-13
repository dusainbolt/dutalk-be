import { Expose } from 'class-transformer';
import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Role } from './jwt.interface';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export abstract class AbstractEntityD extends AbstractEntity {
  @DeleteDateColumn({ name: 'deleted_at' })
  @Expose({ groups: [Role.ADMIN] })
  deletedAt?: Date;
}

export abstract class AbstractAdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [Role.ADMIN] })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [Role.ADMIN] })
  updatedAt: Date;
}

export abstract class AbstractAdminEntityD extends AbstractAdminEntity {
  @DeleteDateColumn({ name: 'deleted_at' })
  @Expose({ groups: [Role.ADMIN] })
  deletedAt?: Date;
}
