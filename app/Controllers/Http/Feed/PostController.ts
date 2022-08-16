import Post from 'App/Models/Feed/Post'
import Attachment from 'App/Models/Feed/Attachment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostController {
  public async show({ params }: HttpContextContract) {
    return Post.query()
      .preload('user', (userQuery) =>
        userQuery
          .preload('addresses')
          .preload('socialAccounts')
          .preload('experiences', (experienceQuery) => experienceQuery.preload('organisation'))
          .preload('badges', (badgesQuery) => badgesQuery.preload('tags'))
          .preload('tags')
      )
      .preload('community')
      .preload('attachments')
      .preload('bounty')
      .where('id', params.post)
      .firstOrFail()
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const { content, attachmentIds = [] } = await request.validate({
      schema: schema.create({
        content: schema.string([rules.required(), rules.maxLength(1200)]),
        attachmentIds: schema.array.nullableAndOptional().members(schema.string()),
      }),
    })

    const post = await Post.create({ content, userId: user.id })

    if (attachmentIds !== null) {
      await Attachment.query().whereIn('id', attachmentIds).update({
        postId: post.id,
      })
    }

    return post.toJSON()
  }
}
