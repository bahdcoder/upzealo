import Post from 'App/Models/Feed/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import AttachmentFactory from './AttachmentFactory'
import CommentFactory from './CommentFactory'
import UserFactory from '../Profile/UserFactory'

export default Factory.define(Post, ({ faker }) => {
  return {
    content: faker.lorem.paragraphs(2),
  }
})
  .relation('attachments', () => AttachmentFactory)
  .relation('comments', () => CommentFactory)
  .relation('user', () => UserFactory)
  .build()
