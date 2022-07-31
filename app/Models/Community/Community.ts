import { BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import SocialAccount from 'App/Models/Profile/SocialAccount'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

export enum CommunityMembershipTypes {
  WALLET_TOKENS = 'WALLET_TOKENS',
  // For wallet token membership types, the user can provide a list of all valid tokens that whitelist a user to this community.
  // if they have that token in their wallet, then they get access. we would have to cater for situations like staking to still track that the user has access.
  INVITE_ONLY = 'INVITE_ONLY',
  // For invite only membership types, users can make requests to join the group.
}

export default class Community extends BaseModel {
  @column()
  public name: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name'],
  })
  public slug: string

  @column()
  public description: string

  @column()
  public rules: string

  @column({ serializeAs: 'coverImage' })
  public coverImage: string

  @hasMany(() => SocialAccount)
  public socialAccounts: HasMany<typeof SocialAccount>

  @column({ serializeAs: 'logoImage' })
  public logoImage: string

  @column({ serializeAs: 'membershipType' })
  public membershipType: CommunityMembershipTypes = CommunityMembershipTypes.WALLET_TOKENS

  @column({ serializeAs: 'userId' })
  public userId: number

  @belongsTo(() => User, { serializeAs: 'owner' })
  public user: BelongsTo<typeof User>

  public TOKENS_HASHLIST_KEY() {
    return `communities:hashlists:${this.slug}`
  }
}
