import { join } from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';

import * as ENTITIES from '@core/db/entities';
import * as MIGRATIONS from '@core/db/migrations';

export async function initializeDatabase (): Promise<void> {
  const entities = Object.values(ENTITIES).map(entity => entity);
  const migrations = Object.values(MIGRATIONS).map(migration => migration);

  const connection: ConnectionOptions = {
    type: 'postgres',
    uuidExtension: 'uuid-ossp',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT ?? '5432'),
    migrations,
    entities,
    migrationsRun: true,
    useUTC: true,
    cli: {
      migrationsDir: `${join(__dirname, 'migrations')}`,
      entitiesDir: `${join(__dirname, 'entities')}`,
    },
    extra: {
      max: process.env.DATABASE_POOL_MAX,
      min: process.env.DATABASE_POOL_MIN,
    },
    poolErrorHandler: (err: Error) =>
      console.log(`⚠️ Database connection error: ${JSON.stringify(err)}`),
  };

  await createConnection(connection);
  console.log('💽 Database connection has been established successfully.');
}
