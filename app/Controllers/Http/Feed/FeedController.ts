import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Getstream from 'App/Services/Getstream'
import Application from '@ioc:Adonis/Core/Application'
import { enrichWithPosts } from 'App/Helpers/Feed/Stream'

export default class FeedController {
  public async timeline({ auth, request }: HttpContextContract) {
    const user = auth.use('jwt').user!
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    const activities = await getstream.timeline(user, page, perPage)

    return enrichWithPosts(activities)
  }

  public async profile({ params }: HttpContextContract) {
    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    const activities = await getstream.profile(params.user)

    return enrichWithPosts(activities)
  }
}
