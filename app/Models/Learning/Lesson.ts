import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Section from 'App/Models/Learning/Section'
import { DateTime } from 'luxon'

export enum LessonType {
  VIDEO = 'VIDEO',
  QUIZ = 'QUIZ',
  ARTICLE = 'ARTICLE',
}

export default class Lesson extends BaseModel {
  @column({ serializeAs: 'sectionId' })
  public sectionId: string

  @belongsTo(() => Section)
  public section: BelongsTo<typeof Section>

  @column()
  public title: string

  @column()
  public index: number

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
  })
  public slug: string

  @column()
  public details: string

  @column()
  public content: string

  @column()
  public type: LessonType = LessonType.ARTICLE

  @column({ serializeAs: 'videoUrl' })
  public videoUrl: string

  @column.dateTime({ serializeAs: 'publishedAt' })
  public publishedAt: DateTime | null
}
