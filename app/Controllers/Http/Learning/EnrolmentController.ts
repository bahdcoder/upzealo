import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrolment from 'App/Models/Learning/Enrolment'

export default class EnrolmentController {
  public async store({ params, auth }: HttpContextContract) {
    const user = auth.user!

    const enrolment = await Enrolment.create({
      courseId: params.course,
      userId: user.id,
    })

    return enrolment
  }
}
