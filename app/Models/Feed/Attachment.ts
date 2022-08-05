import { DateTime } from 'luxon'
import { column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'

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

  @column()
  public driver: AttachmentDrivers = AttachmentDrivers.CLOUDINARY

  @column({ serializeAs: 'mimeType' })
  public mimeType: string

  @column.dateTime({ autoCreate: true, serializeAs: 'deletedAt' })
  public deletedAt: DateTime
}
