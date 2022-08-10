import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUsernameController {
  public async update({ request, auth }: HttpContextContract) {
    const user = auth.user!

    const { username } = await request.validate({
      schema: schema.create({
        username: schema.string([
          rules.required(),
          rules.unique({
            table: 'users',
            column: 'username',
          }),
        ]),
      }),
    })

    user.username = username

    await user.save()

    await user.load((loader) => {
      loader.load('addresses').load('socialAccounts')
    })

    return user.toJSON()
  }
}
