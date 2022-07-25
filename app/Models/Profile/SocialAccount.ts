import { column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/Profile/User'
import BaseModel from 'App/Models/Base'

export enum SupportedSocialNetworks {
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  DISCORD = 'DISCORD',
}

export default class SocialAccount extends BaseModel {
  @column()
  public network: SupportedSocialNetworks

  @column()
  public networkId: string

  @column()
  public userId: number

  @column()
  public username: string

  @column()
  public avatarUrl: string | null

  @column()
  public accessToken: string

  @column()
  public meta: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
