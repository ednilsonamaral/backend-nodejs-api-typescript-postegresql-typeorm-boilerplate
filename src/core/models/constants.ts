import { Environments } from '@shared/enumerators';

export interface IConstants {
  env: Environments;
  debug: boolean;
  appName: string;
  appKey: string;
  timezone: string;
  locale: string;
  port: number;

  database: {
    hostWrite: string;
    port: number;
    name: string;
    user: string;
    password: string;
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  };

  rateLimit: {
    enabled: boolean;

    general: {
      windowMs: number;
      max: number;
    };

    critical: {
      windowMs: number;
      max: number;
      endpoints: string[];
    };
  };

  multer: {
    fileSize: number;
  };
}

export interface IEnvironmentSecrets {
  NODE_ENV: string;
  APP_NAME: string;
  APP_API_KEY: string;
  DEBUG: string;
  TIMEZONE: string;
  locale: string;
  PORT: string;

  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_POOL_MAX: string;
  DATABASE_POOL_MIN: string;
  DATABASE_ACQUIRE: string;
  DATABASE_IDLE: string;

  RATE_LIMIT_ENABLED: string;
  RATE_LIMIT_GENERAL_WINDOW_MS: string;
  RATE_LIMIT_GENERAL_MAX: string;
  RATE_LIMIT_CRITICAL_WINDOW_MS: string;
  RATE_LIMIT_CRITICAL_MAX: string;
  RATE_LIMIT_CRITICAL_ENDPOINTS: string;

  MULTER_FILE_SIZE: string;
}
