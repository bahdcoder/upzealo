import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Community from 'App/Models/Community/Community'

export enum MembershipStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
}

export default class Membership extends BaseModel {
  @column()
  public status: MembershipStatus = MembershipStatus.PENDING

  @column({ serializeAs: 'communityId' })
  public communityId: string

  @belongsTo(() => Community)
  public community: BelongsTo<typeof Community>

  @column({ serializeAs: 'userId' })
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
