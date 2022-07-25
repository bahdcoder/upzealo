import { DateTime } from 'luxon'
import { BaseModel as LucidBaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BaseModel extends LucidBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime
}
