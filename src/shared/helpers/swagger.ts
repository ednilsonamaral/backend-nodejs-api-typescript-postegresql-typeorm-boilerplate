import { Application } from 'express';
import Swagger, { Options } from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

export class SwaggerHelper {
  static getDefinition (): Options {
    return {
      swaggerDefinition: {
        swagger: '2.0',
        info: {
          title: 'Boilerplate Node.js API',
          version: '1.0.0',
          description: 'Boilerplate for a Node.js API with Typescript, PostgreSQL, TypeORM and InversifyJS',
        },
        basePath: '/',
      },
      apis: [],
    };
  }

  static initializeDocs (app: Application) {
    const spec = Swagger(SwaggerHelper.getDefinition());

    app.use('/docs', serve, setup(spec));

    return app;
  }
}
