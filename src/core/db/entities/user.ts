import { Column, Entity } from 'typeorm';

import BaseEntity from '@core/db/entities/base';

import { ProfileType } from '@shared/enumerators';

@Entity('users')
export class UserEntity extends BaseEntity {
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
    nullable: false,
  })
  public birthDate: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public phone: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public profileType?: ProfileType;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  public lastAccessAt?: Date;

  constructor (props: Partial<UserEntity>) {
    super();
    Object.assign(this, props);
  }
}
