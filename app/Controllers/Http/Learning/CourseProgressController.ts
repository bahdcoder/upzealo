import Bull from '@ioc:Rocketseat/Bull'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Course from 'App/Models/Learning/Course'
import UpdateResumeNft from 'App/Jobs/Learning/UpdateResumeNft'
import CompletedLesson from 'App/Models/Learning/CompletedLesson'
import Enrolment from 'App/Models/Learning/Enrolment'
import { DateTime } from 'luxon'

export default class CourseProgressController {
  public async index({ auth, params }: HttpContextContract) {
    const user = auth.user!

    const completedLessons = await CompletedLesson.query()
      .where('courseId', params.course)
      .where('userId', user.id)
      .select(['lessonId'])

    return completedLessons
  }

  public async store({ params, auth }: HttpContextContract) {
    const user = auth.user!

    const course = await Course.query()
      .preload('sections', (sectionQuery) => sectionQuery.preload('lessons'))
      .where('id', params.course)
      .firstOrFail()

    const completedLesson = await CompletedLesson.create({
      courseId: params.course,
      lessonId: params.lesson,
      userId: user.id,
    })

    const [
      {
        $extras: { totalCompletedLessons },
      },
    ] = (await CompletedLesson.query()
      .where('courseId', params.course)
      .where('userId', user.id)
      .count('*', 'totalCompletedLessons')) as unknown as {
      $extras: { totalCompletedLessons: number }
    }[]

    let enrolment: Enrolment

    // if this is the first completed lesson, let's enrol the user in this course
    if (totalCompletedLessons === 1) {
      enrolment = await Enrolment.create({
        userId: user.id,
        courseId: course.id,
      })
    } else {
      enrolment = await Enrolment.query()
        .where('userId', user.id)
        .where('courseId', course.id)
        .firstOrFail()
    }

    let totalLessonsInCourse = 0

    course.sections.forEach((section) => {
      section.lessons.forEach(() => {
        totalLessonsInCourse++
      })
    })

    console.log({ totalLessonsInCourse, totalCompletedLessons })

    if (totalCompletedLessons === totalLessonsInCourse) {
      enrolment.completedAt = DateTime.now()

      await enrolment.save()

      // user has completed the course. let's update the user's resume and do all the nice things.
      Bull.add(new UpdateResumeNft().key, {
        user: user.id,
      })
    }

    return completedLesson
  }
}
