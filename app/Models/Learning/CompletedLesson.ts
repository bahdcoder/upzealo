import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import User from 'App/Models/Profile/User'
import Lesson from 'App/Models/Learning/Lesson'
import Course from 'App/Models/Learning/Course'

export default class CompletedLesson extends BaseModel {
  @column({ serializeAs: 'lessonId' })
  public lessonId: string

  @belongsTo(() => Lesson)
  public lesson: BelongsTo<typeof Lesson>

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'courseId' })
  public courseId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
