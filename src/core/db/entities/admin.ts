import { Column, Entity } from 'typeorm';

import BaseEntity from '@core/db/entities/base';

import { AdminRole } from '@shared/enumerators/admin-role';

@Entity('admins')
export class AdminEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public document: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  public birthDate: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public phone: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
    nullable: false,
  })
  public adminRole: AdminRole;

  constructor (props: Partial<AdminEntity>) {
    super();
    Object.assign(this, props);
  }
}
