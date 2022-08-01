import * as BaseStream from 'getstream'
import { StreamClient } from 'getstream'

export interface StreamConfig {
  apiKey: string
  apiSecret: string
  appId: string
}

export default class Stream {
  private stream: StreamClient

  constructor(config: StreamConfig) {
    this.stream = BaseStream.connect(config.apiKey, config.apiSecret, config.appId)
  }

  accessToken(userId: string) {
    return this.stream.createUserToken(userId)
  }
}
