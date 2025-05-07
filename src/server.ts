import './core/module-alias';
import { InversifyExpressServer } from 'inversify-express-utils';

import { initializeApp } from '@src/setup';

import { getEnv } from '@core/constants';
import { container } from '@core/container';

export class Server {
  constructor () {
    this.createServer();
  }

  createServer (): void {
    const server = new InversifyExpressServer(container, null, { rootPath: '/' });

    const app = initializeApp(server);
    const { port, env } = getEnv();

    app.listen(port, () => {
      console.log(`💿 Server started at http://localhost:${port}`);
      console.log(`💿 Environment: ${env}`);
    });
  }
}
