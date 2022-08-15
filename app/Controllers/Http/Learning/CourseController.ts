import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Learning/Course'
import Badge from 'App/Models/Profile/Badge'

export default class CourseController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const badgeId = request.input('badgeId')

    const courseQuery = Course.query().whereNotNull('published_at')

    if (badgeId) {
      courseQuery.where('badgeId', badgeId)
    }

    const courses = await courseQuery
      .preload('sections', (sectionQuery) =>
        sectionQuery
          .whereNotNull('published_at')
          .preload('lessons', (lessonQuery) =>
            lessonQuery.whereNotNull('published_at').orderBy('index', 'asc')
          )
          .orderBy('index', 'asc')
      )
      .preload('path')
      .paginate(page, perPage)

    return courses
  }

  public async badges({ auth }: HttpContextContract) {
    const user = auth.user

    let badgesQuery = Badge.query().select(['id', 'title', 'description', 'icon', 'class_name'])

    if (user) {
      await user.load('badges')
      const allUserBadges = user.badges.map((badge) => badge.id)

      badgesQuery.whereIn('id', allUserBadges)
    }

    const badges = await badgesQuery
      .preload('tags', (tagsQuery) => tagsQuery.select(['id', 'title']))
      .preload('courses', (courseQuery) => {
        courseQuery
          .preload('author', (authorQuery) => authorQuery.preload('user'))
          .preload('sections', (sectionQuery) =>
            sectionQuery
              .whereNotNull('published_at')
              .preload('lessons', (lessonQuery) =>
                lessonQuery.whereNotNull('published_at').orderBy('index', 'asc')
              )
              .orderBy('index', 'asc')
          )
          .preload('path')
      })

    return { badges }
  }

  public async show({ params }: HttpContextContract) {
    const course = await Course.query()
      .whereNotNull('published_at')
      .where('slug', params.course)
      .preload('badge')
      .preload('author', (authorQuery) => authorQuery.preload('user'))
      .preload('sections', (sectionQuery) =>
        sectionQuery
          .whereNotNull('published_at')
          .preload('lessons', (lessonQuery) =>
            lessonQuery.whereNotNull('published_at').orderBy('index', 'asc')
          )
          .orderBy('index', 'asc')
      )
      .preload('path')
      .firstOrFail()

    return { course }
  }
}
