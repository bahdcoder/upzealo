import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

import BaseModel from 'App/Models/Base'
import Course from 'App/Models/Learning/Course'

export default class Path extends BaseModel {
  @hasMany(() => Course)
  public courses: HasMany<typeof Course>

  @column()
  public title: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
  })
  public slug: string

  @column()
  public details: string

  @column({ serializeAs: 'coverImage' })
  public coverImage: string
}
