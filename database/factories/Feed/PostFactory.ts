import Post from 'App/Models/Feed/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Post, ({ faker }) => {
  return {
    content: faker.lorem.paragraphs(2),
  }
}).build()
