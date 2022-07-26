import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CommunityFactory from 'Database/factories/Community/CommunityFactory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await CommunityFactory.with('user').apply('tokens').createMany(10)
  }
}
