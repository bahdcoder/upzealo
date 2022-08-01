import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Getstream from 'App/Services/Getstream'
import Application from '@ioc:Adonis/Core/Application'
import { enrichWithPosts } from 'App/Helpers/Feed/Stream'

export default class FeedController {
  public async timeline({ auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    const activities = await getstream.timeline(user)

    return enrichWithPosts(activities)
  }

  public async profile({ params }: HttpContextContract) {
    const getstream: Getstream = Application.container.use('Adonis/Addons/Getstream')

    const activities = await getstream.profile(params.user)

    return enrichWithPosts(activities)
  }
}
