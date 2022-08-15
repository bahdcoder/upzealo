import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Certifier from 'App/Models/Learning/Certifier'

export default class ExternalCertification extends BaseModel {
  @column({ serializeAs: 'certifierId' })
  public certifierId: string

  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'certifierCourse' })
  public certifierCourse: string

  @belongsTo(() => Certifier)
  public certifier: BelongsTo<typeof Certifier>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
