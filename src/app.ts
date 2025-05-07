import './core/module-alias';

import { Server } from '@src/server';

import { initializeConstants } from '@core/constants';
import { initializeDatabase } from '@core/db/database';

async function bootstrap (): Promise<void> {
  initializeConstants();
  await initializeDatabase();

  new Server();
}

bootstrap().catch((err) => console.log(`⚠️ bootstrap: ${err.message}`));
