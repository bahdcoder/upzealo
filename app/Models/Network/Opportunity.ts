import { column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'

export default class Opportunity extends BaseModel {
  @column()
  public title: string

  @column()
  public content: string
}
