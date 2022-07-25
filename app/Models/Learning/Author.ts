import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Course from 'App/Models/Learning/Course'

export default class Author extends BaseModel {
  @hasMany(() => Course)
  public courses: HasMany<typeof Course>

  @column()
  public bio: string
}
