import User from 'App/Models/Profile/User'
import { JobContract } from '@ioc:Rocketseat/Bull'
import Enrolment from 'App/Models/Learning/Enrolment'

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

export default class UpdateResumeNft implements JobContract {
  public key = 'Learning/UpdateResumeNft'

  public async handle(job) {
    const { data } = job

    const user = await User.query().preload('addresses').where('id', data.user).firstOrFail()

    const completedCourses = await Enrolment.query()
      .where('user_id', user.id)
      .whereNotNull('completed_at')
      .preload('course', (courseQuery) =>
        courseQuery.preload('sections', (sectionQuery) =>
          sectionQuery
            .preload('skills', (skillQuery) => skillQuery.orderBy('index', 'desc'))
            .orderBy('index', 'desc')
        )
      )

    console.log({ completedCourses })
  }
}
