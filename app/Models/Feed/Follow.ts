import { afterCreate, column, afterDelete } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'

import Getstream from 'App/Services/Getstream'
import Application from '@ioc:Adonis/Core/Application'

export default class Follow extends BaseModel {
  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'targetId' })
  public targetId: string

  @afterCreate()
  public static async syncFollow(follow: Follow) {
    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    await getstream.followUser(follow)
  }

  @afterDelete()
  public static async syncUnfollow(follow: Follow) {
    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    await getstream.unfollowUser(follow)
  }
}
