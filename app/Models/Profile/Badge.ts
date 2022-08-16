import { column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Tag from 'App/Models/Profile/Tag'
import Course from 'App/Models/Learning/Course'
import Community from 'App/Models/Community/Community'

export default class Badge extends BaseModel {
  @column()
  public title: string

  @column()
  public description: string

  @column()
  public icon: string

  @column({ serializeAs: 'className' })
  public className: string

  @hasMany(() => Tag)
  public tags: HasMany<typeof Tag>

  @hasMany(() => Course)
  public courses: HasMany<typeof Course>

  @manyToMany(() => Community)
  public communities: ManyToMany<typeof Community>
}
