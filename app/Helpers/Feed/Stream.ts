import Post from 'App/Models/Feed/Post'
import User from 'App/Models/Profile/User'
import { FeedAPIResponse } from 'getstream'

export async function enrichWithPosts(activities: FeedAPIResponse['results'], user: User) {
  const ids = activities.map((activity) => activity.foreign_id)

  const allPosts = await Post.query()
    .whereIn('id', ids)
    .preload('user', (userQuery) =>
      userQuery
        .preload('addresses')
        .preload('socialAccounts')
        .preload('experiences', (experienceQuery) => experienceQuery.preload('organisation'))
        .preload('badges', (badgesQuery) => badgesQuery.preload('tags'))
        .preload('tags')
    )
    .preload('community')
    .preload('bounty', (bountyQuery) => bountyQuery.preload('winner'))
    .preload('attachments')

  const users = allPosts.map((post) => post.user)

  let populatedUsers = await User.loadFollowersAndFollowingCount(users)
  populatedUsers = await user.attachFollowStatus(populatedUsers)

  return activities.map((activity) => {
    const post = allPosts.find((post) => post.id === activity.foreign_id)!

    post.user = populatedUsers.find((populatedUser) => populatedUser.id === post.userId) as any

    return {
      stream: activity,
      post,
    }
  })
}
