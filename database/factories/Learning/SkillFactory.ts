import SkillFactory from 'App/Models/Learning/Skill'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(SkillFactory, ({ faker }) => {
  return {
    name: faker.lorem.sentence(4),
    index: faker.datatype.number({ min: 0, max: 50 }),
    description: faker.lorem.paragraph(4),
  }
}).build()
