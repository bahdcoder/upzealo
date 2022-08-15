import Comment from 'App/Models/Feed/Comment'
import Factory from '@ioc:Adonis/Lucid/Factory'
import AttachmentFactory from './AttachmentFactory'
import PostFactory from './PostFactory'
import UserFactory from '../Profile/UserFactory'

export default Factory.define(Comment, ({ faker }) => {
  return {
    content: faker.lorem.paragraph(),
  }
})
  .relation('attachments', () => AttachmentFactory)
  .relation('post', () => PostFactory)
  .relation('user', () => UserFactory)
  .build()
