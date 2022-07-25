import { test } from '@japa/runner'
import { getUserKeypair, joinAndLogin } from 'App/Helpers/Tests'

test.group('user registration (join)', () => {
  test('can join platform with a new wallet address', async ({ client, expect }) => {
    const { signature, publicKey } = getUserKeypair()

    const response = await client
      .post('/auth/join')
      .field('signature', signature)
      .field('publicKey', publicKey)

    const body = response.body()

    expect(body.accessToken).toBeDefined()
  })

  test('registration fails if wallet has already been registered', async ({ client, expect }) => {
    const { signature, publicKey } = await joinAndLogin(client)

    const response = await client
      .post('/auth/join')
      .field('signature', signature)
      .field('publicKey', publicKey)

    expect(response.status()).toEqual(401)
    expect(response.body()).toMatchObject({
      message: 'E_ADRESS_REGISTERED: Address already registered.',
    })
  })

  test('registration fails if signature passed is not signed by public key', async ({
    client,
    expect,
  }) => {
    const { signature, publicKey } = getUserKeypair('INVALID_SIGNATURE')

    await client.post('/auth/join').field('signature', signature).field('publicKey', publicKey)

    const response = await client
      .post('/auth/join')
      .field('signature', signature)
      .field('publicKey', publicKey)

    expect(response.status()).toEqual(401)
    expect(response.body()).toMatchObject({ message: 'E_INVALID_SIGNATURE: Invalid signature.' })
  })
})
