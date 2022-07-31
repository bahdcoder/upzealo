/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

  BASE_URL: Env.schema.string({ format: 'url' }),

  /**
   * Database connection configuration
   */
  DB_CONNECTION: Env.schema.string(),

  /**
   *
   * Mysql database environment variables
   */
  MYSQL_HOST: Env.schema.string({ format: 'host' }),
  MYSQL_PORT: Env.schema.number(),
  MYSQL_USER: Env.schema.string(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string(),

  /**
   * Social authentication variables
   */
  DISCORD_CLIENT_ID: Env.schema.string(),
  DISCORD_CLIENT_SECRET: Env.schema.string(),
  DISCORD_CALLBACK_URL: Env.schema.string(),

  TWITTER_V2_CLIENT_ID: Env.schema.string(),
  TWITTER_V2_CLIENT_SECRET: Env.schema.string(),
  TWITTER_V2_CALLBACK_URL: Env.schema.string(),

  LINKEDIN_CLIENT_ID: Env.schema.string(),
  LINKEDIN_CLIENT_SECRET: Env.schema.string(),
  LINKEDIN_CALLBACK_URL: Env.schema.string(),

  /**
   * Redis
   */
  REDIS_CONNECTION: Env.schema.enum(['local'] as const),
  REDIS_HOST: Env.schema.string({ format: 'host' }),
  REDIS_PORT: Env.schema.number(),
  REDIS_PASSWORD: Env.schema.string.optional(),

  /**
   * Blockchain related
   */
  RPC_URL: Env.schema.string({ format: 'url' }),
})
