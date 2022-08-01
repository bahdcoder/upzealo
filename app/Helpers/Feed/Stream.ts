import Post from 'App/Models/Feed/Post'
import { FeedAPIResponse } from 'getstream'

export async function enrichWithPosts(activities: FeedAPIResponse['results']) {
  const ids = activities.map((activity) => activity.foreign_id)

  const allPosts = await Post.query()
    .whereIn('id', ids)
    .preload('user', (userQuery) => userQuery.preload('addresses').preload('socialAccounts'))
    .preload('community')
    .preload('attachments')

  return activities.map((activity) => ({
    stream: activity,
    post: allPosts.find((post) => post.id === activity.foreign_id),
  }))
}
