import { test } from '@japa/runner'
import { joinAndLogin } from 'App/Helpers/Tests/Utils'
import PostFactory from 'Database/factories/Feed/PostFactory'

import { file } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'

test.group('Feed create post', () => {
  // Write your test here
  test('a user can create a post to their personal feed', async ({ client, expect }) => {
    Application.container.fake('Adonis/Addons/Getstream', () => ({ addActivity() {} }))

    const { AUTH, BEARER, user } = await joinAndLogin(client)

    const response = await client
      .post('/feed/posts')
      .json({
        content: (await PostFactory.make()).content,
        attachmentIds: null,
      })
      .header(AUTH, BEARER)

    const body = response.body()

    expect(response.status()).toEqual(200)
    expect(body.id).toBeDefined()
    expect(body.content).toBeDefined()
    expect(body.userId).toEqual(user.id)

    Application.container.restore('Adonis/Addons/Getstream')
  }).skip()

  test('a user can create a post with attachments', async ({ client }) => {
    const TEST_URL = 'https://test-upload-cloudinary.com/url.png'

    Application.container.fake('Adonis/Addons/Cloudinary', () => ({
      upload() {
        return {
          secure_url: TEST_URL,
          type: 'image/png',
        }
      },
    }))

    const { AUTH, BEARER } = await joinAndLogin(client)

    const image = await file.generatePng('1mb')

    const response = await client
      .post('/feed/attachments')
      .file('file', image.contents, { filename: image.name })
      .header(AUTH, BEARER)

    const body = response.body()

    console.log({ body })
  }).skip()
})
