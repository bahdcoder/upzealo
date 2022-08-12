import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Organisation from 'App/Models/Network/Organisation'

export default class Experience extends BaseModel {
  @column()
  public title: string

  @column({ serializeAs: 'organisationId' })
  public organisationId: string

  @column({ serializeAs: 'userId' })
  public userId: string

  @column.date({ serializeAs: 'startedAt' })
  public startedAt: DateTime

  @column.date({ serializeAs: 'endedAt' })
  public endedAt: DateTime | null

  @belongsTo(() => Organisation)
  public organisation: BelongsTo<typeof Organisation>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
