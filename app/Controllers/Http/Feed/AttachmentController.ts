import Attachment from 'App/Models/Feed/Attachment'
import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cloudinary from 'App/Services/Cloudinary'

export default class AttachmentController {
  public async store({ request, auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const { file } = await request.validate({
      schema: schema.create({
        file: schema.file({
          size: '4mb',
          extnames: ['jpg', 'gif', 'png', 'jpeg'],
        }),
      }),
    })

    const cloudinary: Cloudinary = Application.container.use('Adonis/Addons/Cloudinary')

    const { secure_url, type } = await cloudinary.upload(file)

    const attachment = await Attachment.create({
      url: secure_url,
      mimeType: type,
      userId: user.id,
    })

    return attachment.toJSON()
  }
}
