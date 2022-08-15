import { JobContract } from '@ioc:Rocketseat/Bull'
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { Keypair } from '@solana/web3.js'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Bot from 'App/Models/Profile/Bot'
import User from 'App/Models/Profile/User'
import Logger from '@ioc:Adonis/Core/Logger'

import { SolanaProgram } from 'App/Services/SolanaProgram'
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

export default class CreateSolanaAccount implements JobContract {
  public key = 'CreateSolanaAccount'

  public async handle(job) {
    const { data } = job

    const user = await User.query().preload('addresses').where('id', data.user).firstOrFail()

    const bot = await Bot.firstOrFail()

    const walletAddress = user.addresses[0].publicKey

    const { transaction, user: userKeypair } = await SolanaProgram.createAccountTransaction(
      walletAddress,
      bot.publicKey
    )

    const decryptedSecretKey = Encryption.decrypt<string>(bot.secretKey)!

    const keypair = Keypair.fromSecretKey(bs58.decode(decryptedSecretKey))

    const signature = await SolanaProgram.sendAndConfirmTransaction(transaction, [
      keypair,
      userKeypair,
    ])

    user.solanaAddress = userKeypair.publicKey.toBase58()

    await user.save()

    Logger.info(`Create account for address ${walletAddress}. Signature: ${signature}`)
    // Do somethign with you job data
  }
}
