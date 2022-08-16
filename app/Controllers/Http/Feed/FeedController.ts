import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Getstream from 'App/Services/Getstream'
import Application from '@ioc:Adonis/Core/Application'
import { enrichWithPosts } from 'App/Helpers/Feed/Stream'
import User from 'App/Models/Profile/User'

export default class FeedController {
  public async timeline({ auth, request }: HttpContextContract) {
    const user = auth.use('jwt').user!
    const page = parseInt(request.input('page', 1))
    const perPage = parseInt(request.input('perPage', 10))

    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    const activities = await getstream.timeline(user, page, perPage)

    return {
      page,
      perPage,
      posts: await enrichWithPosts(activities, user),
    }
  }

  public async profile({ request, params, auth }: HttpContextContract) {
    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    const page = parseInt(request.input('page', 1))
    const perPage = parseInt(request.input('perPage', 10))

    const user = await User.query().where('username', params.user).firstOrFail()

    const activities = await getstream.profile(user.id, page, perPage)

    return {
      page,
      perPage,
      posts: await enrichWithPosts(activities, auth.user!),
    }
  }
}
