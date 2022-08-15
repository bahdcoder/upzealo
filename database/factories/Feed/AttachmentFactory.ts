import Attachment, { AttachmentDrivers } from 'App/Models/Feed/Attachment'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PostFactory from './PostFactory'
import CommentFactory from './CommentFactory'

export default Factory.define(Attachment, ({ faker }) => {
  return {
    url: faker.image.city(1920, 1080),
    driver: AttachmentDrivers.CLOUDINARY,
  }
})
  .relation('post', () => PostFactory)
  .relation('comment', () => CommentFactory)
  .build()
