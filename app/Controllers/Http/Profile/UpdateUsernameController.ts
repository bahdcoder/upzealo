import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUsernameController {
  public async update({ request, auth }: HttpContextContract) {
    const user = auth.user!

    const { username } = await request.validate({
      schema: schema.create({
        username: schema.string([
          rules.required(),
          rules.regex(/^[a-zA-Z0-9]+$/),
          rules.unique({
            table: 'users',
            column: 'username',
          }),
        ]),
      }),
      messages: {
        'username.unique': 'Username is no longer available. Please choose another one.',
        'username.regex':
          'A valid username can not contain spaces. You may use underscores or dashes.',
      },
    })

    user.username = username

    await user.save()

    await user.load((loader) => {
      loader.load('addresses').load('socialAccounts').load('tags').load('badges')
    })

    return user.toJSON()
  }
}
