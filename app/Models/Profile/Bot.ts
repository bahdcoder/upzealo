import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'

export default class Bot extends BaseModel {
  @column({ serializeAs: 'publicKey' })
  public publicKey: string

  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'secretKey' })
  public secretKey: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
