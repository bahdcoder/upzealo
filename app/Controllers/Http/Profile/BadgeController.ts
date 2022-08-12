import Badge from 'App/Models/Profile/Badge'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BadgeController {
  public async index() {
    const badges = await Badge.query()
      .select(['id', 'title', 'description', 'icon', 'class_name'])
      .preload('tags', (tagsQuery) => tagsQuery.select(['id', 'title']))

    return badges
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = auth.user!

    const { badges } = await request.validate({
      schema: schema.create({
        badges: schema
          .array([rules.required(), rules.minLength(1), rules.maxLength(12000)])
          .members(schema.string([])),
      }),
    })

    await user.related('badges').sync(badges)

    return badges
  }
}
