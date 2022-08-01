import Env from '@ioc:Adonis/Core/Env'
import { StreamConfig } from 'App/Services/Getstream'

const streamConfig: StreamConfig = {
  apiKey: Env.get('GETSTREAM_API_KEY'),
  apiSecret: Env.get('GETSTREAM_API_SECRET'),
  appId: Env.get('GETSTREAM_APP_ID'),
}

export default streamConfig
