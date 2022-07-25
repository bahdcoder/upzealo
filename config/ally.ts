/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { AllyConfig } from '@ioc:Adonis/Addons/Ally'

/*
|--------------------------------------------------------------------------
| Ally Config
|--------------------------------------------------------------------------
|
| The `AllyConfig` relies on the `SocialProviders` interface which is
| defined inside `contracts/ally.ts` file.
|
*/
const allyConfig: AllyConfig = {
  /*
	|--------------------------------------------------------------------------
	| Twitter driver
	|--------------------------------------------------------------------------
	*/
  twitter_v2: {
    driver: 'twitter_v2',
    clientId: Env.get('TWITTER_V2_CLIENT_ID'),
    clientSecret: Env.get('TWITTER_V2_CLIENT_SECRET'),
    callbackUrl: Env.get('TWITTER_V2_CALLBACK_URL'),
  },
  /*
	|--------------------------------------------------------------------------
	| Discord driver
	|--------------------------------------------------------------------------
	*/
  discord: {
    driver: 'discord',
    clientId: Env.get('DISCORD_CLIENT_ID'),
    clientSecret: Env.get('DISCORD_CLIENT_SECRET'),
    callbackUrl: Env.get('DISCORD_CALLBACK_URL'),
  },
  /*
  |--------------------------------------------------------------------------
  | LinkedIn driver
  |--------------------------------------------------------------------------
  */
  linkedin: {
    driver: 'linkedin',
    clientId: Env.get('LINKEDIN_CLIENT_ID'),
    clientSecret: Env.get('LINKEDIN_CLIENT_SECRET'),
    callbackUrl: Env.get('LINKEDIN_CALLBACK_URL'),
  },
}

export default allyConfig
