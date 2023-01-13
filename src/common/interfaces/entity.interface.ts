import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  /**
   * Creation date is generated and inserted only once,
   * at the first time when you create an object, the value is inserted into the table, and is never touched again.
   */
  @CreateDateColumn({ name: 'created_On' })
  createdOn: Date;

  @Column({ name: 'created_by', default: 'SA', length: 255 })
  createdBy: string;

  // This date is being updated each time you persist the object.
  @UpdateDateColumn({ name: 'updated_On' })
  updatedOn: Date;

  @Column({ name: 'updated_by', default: 'SA', length: 255 })
  updatedBy: string;
}
