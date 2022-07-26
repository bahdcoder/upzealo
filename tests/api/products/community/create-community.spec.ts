import { test } from '@japa/runner'
import { Keypair } from '@solana/web3.js'
import { joinAndLogin } from 'App/Helpers/Tests'
import CommunityFactory from 'Database/factories/Community/CommunityFactory'

import Redis from '@ioc:Adonis/Addons/Redis'
import Community from 'App/Models/Community/Community'

test.group('create communities', () => {
  test('a user can create a community', async ({ client, expect }) => {
    const { AUTH, BEARER } = await joinAndLogin(client)

    const newCommunity = (await CommunityFactory.apply('tokens').make()).$attributes

    const tokensList = Array.from(Array(5).keys()).map((_) =>
      Keypair.generate().publicKey.toBase58()
    )

    const response = await client
      .post('/communities')
      .json({
        ...newCommunity,
        tokensList,
      })
      .header(AUTH, BEARER)

    const body = response.body()

    const savedCommunity = await Community.findOrFail(body.id)

    const set = await Redis.smembers(savedCommunity.TOKENS_HASHLIST_KEY())

    expect(tokensList.sort()).toEqual(set.sort())
    expect(body).toMatchObject(newCommunity)
  })

  test('all community data is validated before community is created', async ({
    client,
    expect,
  }) => {
    const { AUTH, BEARER } = await joinAndLogin(client)

    const response = await client.post('/communities').json({}).header(AUTH, BEARER)

    const body = response.body()

    expect(response.status()).toEqual(422)
    expect(body.errors).toBeDefined()
  })
})
