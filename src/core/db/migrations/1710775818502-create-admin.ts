import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class createAdmin1710775818502 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          }),
          new TableColumn({
            name: 'document',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          }),
          new TableColumn({
            name: 'birthDate',
            type: 'date',
            isNullable: false,
          }),
          new TableColumn({
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'adminRole',
            type: 'enum',
            enum: [ 'super', 'manager', 'support' ],
            isNullable: false,
          }),
          new TableColumn({
            name: 'createdBy',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          }),
          new TableColumn({
            name: 'updatedBy',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          }),
          new TableColumn({
            name: 'deletedBy',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          }),
        ],
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admin', true, true, true);
  }
}
