import { beforeCreate, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Path from 'App/Models/Learning/Path'
import Author from 'App/Models/Learning/Author'
import Section from 'App/Models/Learning/Section'

import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { DateTime } from 'luxon'
import Badge from 'App/Models/Profile/Badge'

const coverImages = [
  'https://craftwork-images.b-cdn.net/wp-content/uploads/edd/Cover-22-1024x769.png',
  'https://craftwork-images.b-cdn.net/wp-content/uploads/edd/Cover-34-1024x768.png',
  'https://craftwork-images.b-cdn.net/wp-content/uploads/edd/Card-2-74.png',
  'https://craftwork-images.b-cdn.net/wp-content/uploads/edd/Card-6-30.png',
  'https://craftwork-images.b-cdn.net/wp-content/uploads/edd/Cover-37.png',
  'https://craftwork-images.b-cdn.net/wp-content/uploads/Blotter-1-1024x769.png',
  'https://craftwork-images.b-cdn.net/wp-content/uploads/Tattoo-1-1024x769.png',
  'https://craftwork-images.b-cdn.net/wp-content/uploads/edd/Craftwork-4.0-Cover-1024x769.png',
]

export default class Course extends BaseModel {
  @column({ serializeAs: 'pathId' })
  public pathId: string

  @column({ serializeAs: 'badgeId' })
  public badgeId: string

  @belongsTo(() => Path)
  public path: BelongsTo<typeof Path>

  @belongsTo(() => Badge)
  public badge: BelongsTo<typeof Badge>

  @column({ serializeAs: 'authorId' })
  public authorId: string

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

  @beforeCreate()
  public static assignRandomCoverImage(course: Course) {
    course.coverImage = coverImages[Math.floor(Math.random() * coverImages.length)]
  }
}
