import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TagController {
  public async store({ request, auth }: HttpContextContract) {
    const user = auth.user!

    const { tags } = await request.validate({
      schema: schema.create({
        tags: schema
          .array([rules.required(), rules.minLength(1), rules.maxLength(12000)])
          .members(schema.string([])),
      }),
    })

    await user.related('tags').sync(tags)

    return tags
  }
}
