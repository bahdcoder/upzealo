import { belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Post from 'App/Models/Feed/Post'
import User from 'App/Models/Profile/User'
import Attachment from 'App/Models/Feed/Attachment'

export default class Comment extends BaseModel {
  @column()
  public content: string

  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'commentId' })
  public commentId: string

  @column({ serializeAs: 'postId' })
  public postId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @hasMany(() => Attachment)
  public attachments: HasMany<typeof Attachment>

  @hasMany(() => Comment)
  public replies: HasMany<typeof Comment>
}
