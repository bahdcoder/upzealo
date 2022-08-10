import BaseModel from 'App/Models/Base'
import { column, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

import Tag from 'App/Models/Profile/Tag'
import Badge from 'App/Models/Profile/Badge'
import Address from 'App/Models/Profile/Address'
import SocialAccount from 'App/Models/Profile/SocialAccount'

import Enrolment from 'App/Models/Learning/Enrolment'
import CompletedLesson from 'App/Models/Learning/CompletedLesson'

export default class User extends BaseModel {
  @column()
  public username: string

  @column()
  public bio: string

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
}
