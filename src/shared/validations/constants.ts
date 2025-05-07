import * as z from 'zod';

const Schema = z.object({
  NODE_ENV: z.string(),
  APP_NAME: z.string().optional(),
  APP_API_KEY: z.string(),
  DEBUG: z.string().default('false'),
  TIMEZONE: z.string().default('America/Sao_Paulo'),
  locale: z.string().default('pt-br'),
  PORT: z.string().default('3025'),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().default('5432'),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_POOL_MAX: z.string().default('10'),
  DATABASE_POOL_MIN: z.string().default('1'),
  DATABASE_ACQUIRE: z.string().default('10000'),
  DATABASE_IDLE: z.string().default('20000'),

  RATE_LIMIT_ENABLED: z.string().default('false'),
  RATE_LIMIT_GENERAL_WINDOW_MS: z.string().default('15000'),
  RATE_LIMIT_GENERAL_MAX: z.string().default('5'),
  RATE_LIMIT_CRITICAL_WINDOW_MS: z.string().default('30000'),
  RATE_LIMIT_CRITICAL_MAX: z.string().default('3'),
  RATE_LIMIT_CRITICAL_ENDPOINTS: z.string().default(''),

  MULTER_FILE_SIZE: z.string().default('31457280'),
});

export default Schema;
