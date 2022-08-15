import { JobContract } from '@ioc:Rocketseat/Bull'
import Follow from 'App/Models/Feed/Follow'
import Bot from 'App/Models/Profile/Bot'

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

export default class FollowBotAccount implements JobContract {
  public key = 'FollowBotAccount'

  public async handle(job) {
    const { data } = job

    const bot = await Bot.firstOrFail()

    await Follow.create({
      userId: data.user,
      targetId: bot.userId,
    })
  }
}
