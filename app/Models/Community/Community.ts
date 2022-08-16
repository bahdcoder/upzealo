import {
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User, { avatars } from 'App/Models/Profile/User'
import SocialAccount from 'App/Models/Profile/SocialAccount'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

import Badge from 'App/Models/Profile/Badge'
import Membership from './Membership'

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

  @manyToMany(() => Badge)
  public badges: ManyToMany<typeof Badge>

  @hasMany(() => SocialAccount)
  public socialAccounts: HasMany<typeof SocialAccount>

  @column({ serializeAs: 'logoImage' })
  public logoImage: string

  @column({ serializeAs: 'membershipType' })
  public membershipType: CommunityMembershipTypes = CommunityMembershipTypes.WALLET_TOKENS

  @column({ serializeAs: 'userId' })
  public userId: string

  @belongsTo(() => User, { serializeAs: 'owner' })
  public user: BelongsTo<typeof User>

  public TOKENS_HASHLIST_KEY() {
    return `communities:hashlists:${this.slug}`
  }

  @hasMany(() => Membership)
  public memberships: HasMany<typeof Membership>

  @beforeCreate()
  public static assignRandomAvatar(community: Community) {
    community.logoImage = avatars[Math.floor(Math.random() * avatars.length)]
    community.coverImage =
      'https://res.cloudinary.com/bahdcoder/image/upload/v1660675893/Rectangle_1_nyjjlw.png'
  }
}
