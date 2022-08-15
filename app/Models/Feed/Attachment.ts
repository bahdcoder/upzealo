import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Post from './Post'
import Comment from './Comment'

export enum AttachmentDrivers {
  CLOUDINARY = 'CLOUDINARY',
  STREAM = 'STREAM',
}

export default class Attachment extends BaseModel {
  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'postId' })
  public postId: string

  @column({ serializeAs: 'commentId' })
  public commentId: string

  @column()
  public url: string

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @belongsTo(() => Comment)
  public comment: BelongsTo<typeof Comment>

  @column()
  public driver: AttachmentDrivers = AttachmentDrivers.CLOUDINARY

  @column({ serializeAs: 'mimeType' })
  public mimeType: string

  @column.dateTime({ autoCreate: true, serializeAs: 'deletedAt' })
  public deletedAt: DateTime
}
