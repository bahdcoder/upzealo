import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { getUserKeypair } from 'App/Helpers/Tests/Utils'
import CommunityFactory from 'Database/factories/Community/CommunityFactory'
import AddressFactory from 'Database/factories/Profile/AddressFactory'

export default class extends BaseSeeder {
  public async run() {
    await CommunityFactory.with('user').apply('tokens').createMany(10)

    await AddressFactory.with('user').createMany(10)

    const { publicKey, signature } = getUserKeypair()

    console.log(`Unregistered user:`, `Public key: ${publicKey}, Signature: ${signature}`)
  }
}
