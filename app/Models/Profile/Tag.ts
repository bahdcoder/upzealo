import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/Base'

import Badge from 'App/Models/Profile/Badge'

export default class Tag extends BaseModel {
  @column()
  public title: string

  @column()
  public description: string

  @column({ serializeAs: 'badgeId' })
  public badgeId: string

  @belongsTo(() => Badge)
  public badge: BelongsTo<typeof Badge>
}
