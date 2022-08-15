import { belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Course from 'App/Models/Learning/Course'

export default class Author extends BaseModel {
  @column({ serializeAs: 'userId' })
  public userId: string

  @hasMany(() => Course)
  public courses: HasMany<typeof Course>

  @column()
  public bio: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
