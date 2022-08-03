import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Learning/Course'

export default class CourseController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const courses = await Course.query()
      .whereNotNull('published_at')
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

  public async show({ params }: HttpContextContract) {
    const course = await Course.query()
      .whereNotNull('published_at')
      .where('id', params.course)
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

    return course
  }
}
