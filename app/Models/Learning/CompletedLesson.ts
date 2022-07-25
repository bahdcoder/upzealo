import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Lesson from 'App/Models/Learning/Lesson'

export default class CompletedLesson extends BaseModel {
  @column({ serializeAs: 'lessonId' })
  public lessonId: number

  @belongsTo(() => Lesson)
  public lesson: BelongsTo<typeof Lesson>

  @column({ serializeAs: 'userId' })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
