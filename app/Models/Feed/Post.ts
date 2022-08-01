import { BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Attachment from 'App/Models/Feed/Attachment'
import Community from 'App/Models/Community/Community'

export default class Post extends BaseModel {
  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'communityId' })
  public communityId: string

  @column()
  public content: string

  @belongsTo(() => Community)
  public community: BelongsTo<typeof Community>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Attachment)
  public attachments: HasMany<typeof Attachment>
}
