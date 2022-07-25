import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Course from 'App/Models/Learning/Course'

export default class Enrolment extends BaseModel {
  @column({ serializeAs: 'courseId' })
  public courseId: number

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  @column({ serializeAs: 'userId' })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ serializeAs: 'completedAt' })
  public completedAt: DateTime
}
