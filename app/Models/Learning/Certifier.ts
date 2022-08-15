import Uid from 'ksuid'
import { beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Skill from 'App/Models/Learning/Skill'

export default class Certifier extends BaseModel {
  @column()
  public name: string

  @column({ serializeAs: 'apiKey' })
  public apiKey: string

  @beforeCreate()
  public static assignApiKey(certifier: Certifier) {
    certifier.apiKey = Uid.randomSync().string
  }

  @hasMany(() => Skill)
  public skills: HasMany<typeof Skill>
}
