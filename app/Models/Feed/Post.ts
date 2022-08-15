import {
  afterCreate,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Bounty from 'App/Models/Feed/Bounty'
import Comment from 'App/Models/Feed/Comment'
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

  @column()
  public type: string = PostType.DEFAULT

  @belongsTo(() => Community)
  public community: BelongsTo<typeof Community>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => Bounty)
  public bounty: HasOne<typeof Bounty>

  @hasMany(() => Attachment)
  public attachments: HasMany<typeof Attachment>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @afterCreate()
  public static async syncFeed(post: Post) {
    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    await getstream.addActivity(post)
  }
}
