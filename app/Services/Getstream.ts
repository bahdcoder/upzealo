import Follow from 'App/Models/Feed/Follow'
import User from 'App/Models/Profile/User'
import * as BaseStream from 'getstream'
import { StreamClient } from 'getstream'

export interface StreamConfig {
  apiKey: string
  apiSecret: string
  appId: string
}

export default class Stream {
  private stream: StreamClient

  constructor(config: StreamConfig) {
    this.stream = BaseStream.connect(config.apiKey, config.apiSecret, config.appId)
  }

  accessToken(userId: string) {
    return this.stream.createUserToken(userId)
  }

  async followUser(follow: Follow) {
    const userFeed = this.stream.feed('timeline', follow.userId)

    return userFeed.follow('user', follow.targetId)
  }

  async unfollowUser(follow: Follow) {
    const userFeed = this.stream.feed('timeline', follow.userId)

    return userFeed.unfollow('user', follow.targetId)
  }

  async addActivity(post: any) {
    const feed = this.stream.feed('user', post.userId)

    return feed.addActivity({
      actor: post.userId,
      verb: 'post',
      foreign_id: post.id,
      object: 'post',
    })
  }

  async addReaction(activityId: string, text: string) {
    const comment = await this.stream.reactions.add('comment', activityId, {
      text,
    })

    return comment
  }

  async timeline(user: User, page = 1, perPage = 10) {
    const feed = this.stream.feed('timeline', user.id)

    const activities = await feed.get({ limit: perPage, offset: page - 1 })

    return activities.results
  }

  async profile(user: string, page = 1, perPage = 10) {
    const feed = this.stream.feed('user', user)

    const activities = await feed.get({ limit: perPage, offset: page - 1 })

    return activities.results
  }
}
