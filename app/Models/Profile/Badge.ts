import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Tag from 'App/Models/Profile/Tag'

export default class Badge extends BaseModel {
  @column()
  public title: string

  @column()
  public description: string

  @column()
  public icon: string

  @column()
  public color: string

  @hasMany(() => Tag)
  public tags: HasMany<typeof Tag>
}
