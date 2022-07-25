/**
 * Contract source: https://git.io/JOdiQ
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */
/**
 * Contract source: https://git.io/JOdiQ
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */
import {
  TwitterV2 as TwitterV2DriverContract,
  TwitterV2Config,
} from '@bahdcoder/ally-twitter-v2/build/standalone'

declare module '@ioc:Adonis/Addons/Ally' {
  interface SocialProviders {
    twitter_v2: {
      config: TwitterV2Config
      implementation: TwitterV2DriverContract
    }
    discord: {
      config: DiscordDriverConfig
      implementation: DiscordDriverContract
    }
    linkedin: {
      config: LinkedInDriverConfig
      implementation: LinkedInDriverContract
    }
  }
}
