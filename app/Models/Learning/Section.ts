import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Course from 'App/Models/Learning/Course'
import Lesson from 'App/Models/Learning/Lesson'

export default class Section extends BaseModel {
  @column({ serializeAs: 'courseId' })
  public courseId: number

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  @hasMany(() => Lesson)
  public lessons: HasMany<typeof Lesson>

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
}
