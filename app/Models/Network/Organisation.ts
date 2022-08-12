import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Community from 'App/Models/Community/Community'

export default class Organisation extends BaseModel {
  @column()
  public name: string

  @column({ serializeAs: 'imageUrl' })
  public imageUrl: string

  @column.date({ serializeAs: 'verifiedAt' })
  public verifiedAt: DateTime | null

  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'communityId' })
  public communityId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Community)
  public community: BelongsTo<typeof Community>
}
