import Bs58 from 'bs58'
import Post, { PostType } from 'App/Models/Feed/Post'
import Attachment from 'App/Models/Feed/Attachment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bounty from 'App/Models/Feed/Bounty'
import { SolanaProgram } from 'App/Services/SolanaProgram'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Comment from 'App/Models/Feed/Comment'

export default class BountyController {
  public async transaction({ request, auth }: HttpContextContract) {
    const user = auth.user!

    const { currencyMint, amount } = await request.validate({
      schema: schema.create({
        currencyMint: schema.string([rules.required()]),
        amount: schema.number([rules.required()]),
      }),
    })

    await user.load('addresses')

    const address = user.addresses[0]

    const { transaction, bounty } = await SolanaProgram.createBountyTransaction({
      userAddress: user.solanaAddress,
      walletAddress: address.publicKey,
      mintAddress: currencyMint,
      amountAsNumber: amount,
    })

    const encryption = Encryption.encrypt(Bs58.encode(bounty.secretKey))

    return { transaction: transaction.serialize({ requireAllSignatures: false }), encryption }
  }

  public async update({ request, params }: HttpContextContract) {
    const { signature, commentId } = await request.validate({
      schema: schema.create({
        commentId: schema.string([rules.required()]),
        signature: schema.string([rules.required()]),
      }),
    })
    const comment = await Comment.query().where('id', commentId).firstOrFail()
    const bounty = await Bounty.query().where('id', params.bounty).preload('post').firstOrFail()

    bounty.winnerId = comment.userId
    bounty.commentId = comment.id
    bounty.winnerSignature = signature

    await bounty.save()

    return { bounty }
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = auth.user!

    const {
      currencyMint,
      amount,
      content,
      attachmentIds = [],
      bountyAddress,
      signature,
    } = await request.validate({
      schema: schema.create({
        content: schema.string([rules.required()]),
        currencyMint: schema.string([rules.required()]),
        amount: schema.number([rules.required()]),
        attachmentIds: schema.array.optional().members(schema.string()),
        signature: schema.string([rules.required()]),
        bountyAddress: schema.string([rules.required()]),
      }),
    })

    await user.load('addresses')

    const address = user.addresses[0]

    const post = await Post.create({ content, userId: user.id, type: PostType.BOUNTY })

    const bounty = await Bounty.create({
      currencyMint,
      amount,
      addressId: address.id,
      postId: post.id,
      published: true,
      bountyAddress,
      signature,
    })

    if (attachmentIds !== null) {
      await Attachment.query().whereIn('id', attachmentIds).update({
        postId: post.id,
      })
    }

    return { post, bounty }
  }
}
