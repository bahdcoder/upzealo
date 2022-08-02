import BaseModel from 'App/Models/Base'
import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Address from 'App/Models/Profile/Address'
import SocialAccount from 'App/Models/Profile/SocialAccount'
import CompletedLesson from 'App/Models/Learning/CompletedLesson'
import Enrolment from 'App/Models/Learning/Enrolment'

export default class User extends BaseModel {
  @column()
  public username: string

  @column({ serializeAs: 'solanaAddress' })
  public solanaAddress: string

  @hasMany(() => Address)
  public addresses: HasMany<typeof Address>

  @hasMany(() => SocialAccount)
  public socialAccounts: HasMany<typeof SocialAccount>

  /** Learning relationships */
  @hasMany(() => CompletedLesson)
  public completedLessons: HasMany<typeof CompletedLesson>

  @hasMany(() => Enrolment)
  public enrolments: HasMany<typeof Enrolment>
}
