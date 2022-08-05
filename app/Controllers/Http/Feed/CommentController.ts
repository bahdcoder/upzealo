import Comment from 'App/Models/Feed/Comment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Attachment from 'App/Models/Feed/Attachment'

export default class CommentController {
  public async index({ request, params }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const comments = await Comment.query()
      .where('post_id', params.post)
      .preload('replies', (repliesQuery) =>
        repliesQuery.preload('user', (userQuery) => userQuery.select(['username', 'id']))
      )
      .preload('user', (userQuery) =>
        userQuery
          .preload('addresses', (addressesQuery) =>
            addressesQuery.select(['publicKey', 'isDefault', 'blockchain'])
          )
          .select(['username', 'id'])
      )
      .paginate(page, perPage)

    return comments
  }

  public async store({ request, auth, params }: HttpContextContract) {
    const user = auth.use('jwt').user!

    const { content, attachmentIds } = await request.validate({
      schema: schema.create({
        content: schema.string([rules.required(), rules.maxLength(1200)]),
        attachmentIds: schema.array.nullable().members(schema.string()),
      }),
    })

    const comment = await Comment.create({
      content,
      userId: user.id,
      postId: params.post,
      commentId: params.comment ? params.comment : null,
    })

    if (attachmentIds !== null) {
      await Attachment.query().whereIn('id', attachmentIds).update({
        commentId: comment.id,
      })
    }

    return comment
  }
}
