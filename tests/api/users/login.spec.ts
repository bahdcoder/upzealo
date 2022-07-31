import { test } from '@japa/runner'
import { getUserKeypair, joinAndLogin } from 'App/Helpers/Tests/Utils'

import Address from 'App/Models/Profile/Address'

test.group('user login (get access token)', () => {
  test('can login after user registration', async ({ client, expect }) => {
    const { signature, publicKey } = getUserKeypair()

    await client.post('/auth/join').field('signature', signature).field('publicKey', publicKey)

    const response = await client.post('/auth/login').json({
      signature,
      publicKey,
    })

    const body = response.body()

    expect(body.accessToken).toBeDefined()
  })

  test('login fails if wallet signature is wrong', async ({ client, expect }) => {
    const { signature, publicKey } = getUserKeypair()

    await client.post('/auth/join').field('signature', signature).field('publicKey', publicKey)

    const { signature: wrongSignature } = getUserKeypair()

    const response = await client.post('/auth/login').json({
      signature: wrongSignature,
      publicKey,
    })

    expect(response.status()).toEqual(401)
    expect(response.body()).toMatchObject({ message: 'E_INVALID_SIGNATURE: Invalid signature.' })
  })

  test('can fetch authenticated user profile after login', async ({ client, expect }) => {
    const { accessToken, publicKey } = await joinAndLogin(client)

    const response = await client.get('/auth/me').header('Authorization', `Bearer ${accessToken}`)

    const address = await Address.query()
      .where('publicKey', publicKey)
      .preload('user')
      .firstOrFail()

    expect(response.body()).toMatchObject({
      id: address.user.id,
      username: null,
      socialAccounts: [],
      addresses: [
        {
          id: address.id,
          publicKey,
          isDefault: true,
        },
      ],
    })
  })
})
