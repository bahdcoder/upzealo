import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateBioController {
  public async update({ request, auth }: HttpContextContract) {
    const user = auth.user!

    const { bio } = await request.validate({
      schema: schema.create({
        bio: schema.string([rules.required(), rules.minLength(24)]),
      }),
    })

    user.bio = bio
    await user.save()

    await user.load((loader) => {
      loader.load('addresses').load('socialAccounts').load('tags').load('badges')
    })

    return user.toJSON()
  }
}
