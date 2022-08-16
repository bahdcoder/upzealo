import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Post from 'App/Models/Feed/Post'
import User from 'App/Models/Profile/User'
import Address from 'App/Models/Profile/Address'
import Comment from './Comment'

export default class Bounty extends BaseModel {
  @column({ serializeAs: 'postId' })
  public postId: string

  @column({ serializeAs: 'commentId' })
  public commentId: string

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

  @column({ serializeAs: 'winnerSignature' })
  public winnerSignature: string

  @column()
  public amount: number

  @belongsTo(() => Address)
  public address: BelongsTo<typeof Address>

  @belongsTo(() => Comment)
  public comment: BelongsTo<typeof Comment>

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @belongsTo(() => User, {
    foreignKey: 'winnerId',
  })
  public winner: BelongsTo<typeof User>
}
