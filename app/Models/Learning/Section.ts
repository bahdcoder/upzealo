import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Skill from 'App/Models/Learning/Skill'
import Course from 'App/Models/Learning/Course'
import Lesson from 'App/Models/Learning/Lesson'

import { DateTime } from 'luxon'

export default class Section extends BaseModel {
  @column({ serializeAs: 'courseId' })
  public courseId: string

  @column()
  public index: number

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  @hasMany(() => Lesson)
  public lessons: HasMany<typeof Lesson>

  @hasMany(() => Skill)
  public skills: HasMany<typeof Skill>

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

  @column.dateTime({ serializeAs: 'publishedAt' })
  public publishedAt: DateTime | null
}
