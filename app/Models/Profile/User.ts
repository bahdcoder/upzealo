import { DateTime } from 'luxon'

import BaseModel from 'App/Models/Base'
import {
  beforeCreate,
  column,
  computed,
  HasMany,
  hasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'

import Tag from 'App/Models/Profile/Tag'
import Badge from 'App/Models/Profile/Badge'
import Address from 'App/Models/Profile/Address'
import SocialAccount from 'App/Models/Profile/SocialAccount'

import Follow from 'App/Models/Feed/Follow'
import Enrolment from 'App/Models/Learning/Enrolment'
import Experience from 'App/Models/Network/Experience'
import Community from 'App/Models/Community/Community'
import CompletedLesson from 'App/Models/Learning/CompletedLesson'

export interface OnboardingStep {
  idx: number
  title: string
  completed: boolean
}

export const avatars = [
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309954/avatars/Funny_Bunny-4.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309954/avatars/E-commerce.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309954/avatars/Funny_Bunny-3.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309954/avatars/Delivery_boy.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309954/avatars/Funny_Bunny-1.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309954/avatars/Delivery_boy-5.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309954/avatars/Delivery_boy-4.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309954/avatars/Delivery_boy-3.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309953/avatars/Delivery_boy-2.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309953/avatars/Delivery_boy-1.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309953/avatars/Cranks-1.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309953/avatars/Cranks-2.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309953/avatars/Upstream-6.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309953/avatars/Upstream-12.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309952/avatars/Upstream-13.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309952/avatars/Upstream-17.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309952/avatars/Upstream-10.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309952/avatars/Upstream-15.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309952/avatars/Upstream-9.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309952/avatars/Upstream-14.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Upstream-16.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Upstream-11.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Teamwork-8.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Teamwork-6.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Upstream.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Upstream-8.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Upstream-3.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Upstream-4.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Upstream-4.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Upstream-2.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Teamwork.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309951/avatars/Upstream-1.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309950/avatars/Upstream-5.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309950/avatars/No_comments_4.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309950/avatars/No_comments_3.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309950/avatars/Teamwork-4.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309950/avatars/Teamwork-5.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309950/avatars/No_comments_7.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309949/avatars/No_comments_6.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309949/avatars/No_gravity-1.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309949/avatars/No_gravity-2.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309949/avatars/No_comments_9.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309949/avatars/No_gravity-3.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309949/avatars/No_comments_8.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309948/avatars/E-commerce-2.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309948/avatars/Funny_Bunny-2.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309948/avatars/No_Comments-2.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309948/avatars/Funny_Bunny-7.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309948/avatars/No_Comments-1.png',
  'https://res.cloudinary.com/bahdcoder/image/upload/v1660309948/avatars/No_Comments-3.png',
]

export default class User extends BaseModel {
  @column()
  public username: string

  @column({ serializeAs: null })
  public isBot: boolean

  @column({ serializeAs: 'avatarUrl' })
  public avatarUrl: string

  @column({ serializeAs: 'resumeMint' })
  public resumeMint: string

  @column({ serializeAs: 'resumeUrl' })
  public resumeUrl: string

  @column({ serializeAs: 'resumePdf' })
  public resumePdf: string

  @column()
  public bio: string

  @column.dateTime({ serializeAs: 'verifiedAt' })
  public verifiedAt: DateTime | null

  @column({ serializeAs: 'solanaAddress' })
  public solanaAddress: string

  @hasMany(() => Address)
  public addresses: HasMany<typeof Address>

  @hasMany(() => SocialAccount)
  public socialAccounts: HasMany<typeof SocialAccount>

  @manyToMany(() => Badge)
  public badges: ManyToMany<typeof Badge>

  @manyToMany(() => Tag)
  public tags: ManyToMany<typeof Tag>

  /** Learning relationships */
  @hasMany(() => CompletedLesson)
  public completedLessons: HasMany<typeof CompletedLesson>

  @hasMany(() => Enrolment)
  public enrolments: HasMany<typeof Enrolment>

  @hasMany(() => Experience)
  public experiences: HasMany<typeof Experience>

  @hasMany(() => Community)
  public communities: HasMany<typeof Community>

  @hasMany(() => Follow)
  public follows: HasMany<typeof Follow>

  @beforeCreate()
  public static assignRandomAvatar(user: User) {
    user.avatarUrl = avatars[Math.floor(Math.random() * avatars.length)]
  }

  @computed()
  public get onboardingSteps() {
    const steps: OnboardingStep[] = [
      {
        idx: 1,
        title: 'Pick username',
        completed: this.username !== null && this.username !== undefined,
      },
      {
        idx: 2,
        title: 'Pick Web3 Journey',
        completed: this.badges?.length > 0,
      },
      {
        idx: 3,
        title: 'Pick Web3 Experience',
        completed: this.tags?.length > 0,
      },
      {
        idx: 4,
        title: 'Update Bio',
        completed: this.bio !== null && this.username !== undefined,
      },
      {
        idx: 5,
        title: 'Follow Recommendations',
        completed: this.$extras['followingCount'] ? this.$extras['followingCount'] > 0 : false,
      },
    ]

    return { steps, completedOnboarding: steps.every((step) => step.completed === true) }
  }

  public async attachFollowStatus(users: User[]) {
    // find all follows between this user and all users passed.
    // loop through users
    // attach the follow status.
    // return updated users array.
    const userIds = users.map((user) => user.id)

    const allFollowingThisUser = await Follow.query()
      .where('target_id', this.id)
      .andWhereIn('user_id', userIds)

    const allFollowedByThisUser = await Follow.query()
      .whereIn('target_id', userIds)
      .andWhere('user_id', this.id)

    const allFollowsBetweenThisUserAndAllUsers = [...allFollowedByThisUser, ...allFollowingThisUser]

    users.forEach((user) => {
      const isFollowing = allFollowsBetweenThisUserAndAllUsers.some(
        (follow) => follow.userId === this.id && follow.targetId === user.id
      )

      const isFollowedBy = allFollowsBetweenThisUserAndAllUsers.some(
        (follow) => follow.userId === user.id && follow.targetId === this.id
      )

      user.$extras['isFollowing'] = isFollowing
      user.$extras['isFollowedBy'] = isFollowedBy
    })

    return users
  }

  public static async loadFollowersAndFollowingCount(users: User[]) {
    const userIds = users.map((user) => user.id)
    const allFollows = await Follow.query()
      .whereIn('target_id', userIds)
      .orWhereIn('user_id', userIds)

    users.forEach((user) => {
      user.$extras['followersCount'] = allFollows.filter(
        (follow) => follow.targetId === user.id
      ).length
      user.$extras['followingCount'] = allFollows.filter(
        (follow) => follow.userId === user.id
      ).length
    })

    return users
  }
}
