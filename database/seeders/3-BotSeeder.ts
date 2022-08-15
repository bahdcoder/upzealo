import Bs58 from 'bs58'
import Encryption from '@ioc:Adonis/Core/Encryption'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/Profile/UserFactory'
import Bot from 'App/Models/Profile/Bot'
import { Keypair } from '@solana/web3.js'

export default class extends BaseSeeder {
  public async run() {
    const existingBot = await Bot.first()

    if (existingBot) {
      console.log('Bot already exists: ', existingBot.publicKey)
      return
    }
    const user = await UserFactory.merge({
      bio: 'We work behind the scenes to give you the greatest experience.',
    }).create()

    const keypair = Keypair.generate()
    let secretKey = Bs58.encode(keypair.secretKey)

    const encryptedSecretKey = Encryption.encrypt(secretKey)

    await Bot.create({
      userId: user.id,
      publicKey: keypair.publicKey.toBase58(),
      secretKey: encryptedSecretKey,
    })

    console.log('Public key:', keypair.publicKey.toBase58())
  }
}
