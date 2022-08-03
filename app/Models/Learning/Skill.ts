import { DateTime } from 'luxon'
import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Section from 'App/Models/Learning/Section'

export default class Skill extends BaseModel {
  @column()
  public name: string

  @column()
  public index: number

  @column()
  public description: string

  @column({ serializeAs: 'sectionId' })
  public sectionId: string

  @belongsTo(() => Section)
  public section: BelongsTo<typeof Section>
}
