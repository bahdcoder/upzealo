import Uid from 'ksuid'
import { DateTime } from 'luxon'
import {
  BaseModel as LucidBaseModel,
  column,
  beforeCreate,
  ModelObject,
} from '@ioc:Adonis/Lucid/Orm'

export default class BaseModel extends LucidBaseModel {
  public serializeExtras = true

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime

  private static modelPrefixes = {
    User: 'user',
    Community: 'cmty',
    Course: 'cse',
    Lesson: 'lsn',
    Path: 'path',
    Section: 'sec',
    Address: 'addr',
    Membership: 'mbr',
    Post: 'post',
    Comment: 'comment',
    Attachment: 'attach',
    Follow: 'follow',
    CompletedLesson: 'comlsn',
    Badge: 'badge',
    Tag: 'tag',
    Organisation: 'org',
    Experience: 'exp',
    Opportunity: 'opp',
    Bounty: 'bounty',
    Bot: 'bot',
    Author: 'author',
  }

  @beforeCreate()
  public static assignKsuid(model: ModelObject) {
    model.id = `${BaseModel.modelPrefixes[model.constructor.name]}_${Uid.randomSync().string}`
  }
}
