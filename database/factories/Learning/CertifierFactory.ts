import Certifier from 'App/Models/Learning/Certifier'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Certifier, ({ faker }) => {
  return {
    name: faker.company.companyName(),
  }
}).build()
