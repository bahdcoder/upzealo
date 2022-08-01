import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Follow from 'App/Models/Feed/Follow'

export default class FollowController {
  public async store({ params, auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const follow = await Follow.create({
      userId: user.id,
      targetId: params.user,
    })

    return follow.toJSON()
  }

  public async destroy({ params, auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const follow = await Follow.query()
      .where('userId', user.id)
      .where('targetId', params.user)
      .firstOrFail()

    await follow.delete()

    return follow.toJSON()
  }
}
