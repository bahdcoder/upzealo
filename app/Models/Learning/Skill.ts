import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Models/Base'
import Section from 'App/Models/Learning/Section'
import Certifier from 'App/Models/Learning/Certifier'
import ExternalCertification from 'App/Models/Learning/ExternalCertification'

export default class Skill extends BaseModel {
  @column()
  public name: string

  @column()
  public index: number

  @column()
  public description: string

  @column({ serializeAs: 'sectionId' })
  public sectionId: string

  @column({ serializeAs: 'certifierId' })
  public certifierId: string

  @column({ serializeAs: 'certifierCourse' })
  public certifierCourse: string

  @belongsTo(() => Section)
  public section: BelongsTo<typeof Section>

  @belongsTo(() => Certifier)
  public certifier: BelongsTo<typeof Certifier>

  @belongsTo(() => ExternalCertification)
  public externalCertification: BelongsTo<typeof ExternalCertification>
}
