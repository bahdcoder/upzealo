import { afterCreate, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Attachment from 'App/Models/Feed/Attachment'
import Community from 'App/Models/Community/Community'

import Getstream from 'App/Services/Getstream'
import Application from '@ioc:Adonis/Core/Application'

export enum PostType {
  DEFAULT = 'DEFAULT',
  BOUNTY = 'BOUNTY',
  SALE = 'SALE',
}

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

  @afterCreate()
  public static async syncFeed(post: Post) {
    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    await getstream.addActivity(post)
  }
}
