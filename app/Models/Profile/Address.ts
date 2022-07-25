import { column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/Profile/User'
import BaseModel from 'App/Models/Base'

export enum SupportedBlockchains {
  ETHEREUM = 'ETHEREUM',
  SOLANA = 'SOLANA',
  POLYGON = 'POLYGON',
}

export default class Address extends BaseModel {
  @column({ serializeAs: 'publicKey' })
  public publicKey: string

  @column()
  public blockchain: SupportedBlockchains = SupportedBlockchains.SOLANA

  @column({ serializeAs: 'isDefault', serialize: (value) => (value === 1 ? true : false) })
  public isDefault: boolean = false

  @column({ serializeAs: 'userId' })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
