import { DateTime } from 'luxon'
import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Post from 'App/Models/Feed/Post'
import User from 'App/Models/Profile/User'
import Address from 'App/Models/Profile/Address'

export default class Bounty extends BaseModel {
  @column({ serializeAs: 'postId' })
  public postId: string

  @column()
  public published: boolean = false

  @column({ serializeAs: 'addressId' })
  public addressId: string

  @column({ serializeAs: 'winnerId' })
  public winnerId: string

  @column({ serializeAs: 'currencyMint' })
  public currencyMint: string

  @column({ serializeAs: 'bountyAddress' })
  public bountyAddress: string

  @column()
  public signature: string

  @column()
  public amount: number

  @belongsTo(() => Address)
  public address: BelongsTo<typeof Address>

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @belongsTo(() => User, {
    foreignKey: 'winner_id',
  })
  public winner: BelongsTo<typeof User>
}
