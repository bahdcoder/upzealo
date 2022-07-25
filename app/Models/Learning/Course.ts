import { belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Path from 'App/Models/Learning/Path'
import Author from 'App/Models/Learning/Author'
import Section from 'App/Models/Learning/Section'

import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { DateTime } from 'luxon'

export default class Course extends BaseModel {
  @column({ serializeAs: 'pathId' })
  public pathId: number

  @belongsTo(() => Path)
  public path: BelongsTo<typeof Path>

  @column({ serializeAs: 'authorId' })
  public authorId: number

  @belongsTo(() => Author)
  public author: BelongsTo<typeof Author>

  @hasMany(() => Section)
  public sections: HasMany<typeof Section>

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

  @column.dateTime({ serializeAs: 'publishedAt' })
  public publishedAt: DateTime | null
}
