import { test } from '@japa/runner'
import {
  createMintForOwner,
  joinAndLogin,
  setupCommunity,
  setupSolana,
} from 'App/Helpers/Tests/Utils'
import Community from 'App/Models/Community/Community'

test.group('fetch communities', () => {
  test('can join a community gated with the required tokens in their wallet', async ({
    client,
    expect,
  }) => {
    const { wallet, AUTH, BEARER } = await joinAndLogin(client)
    const { connection } = await setupSolana(wallet)

    const { mint } = await createMintForOwner(connection, wallet)

    await Promise.all([
      setupCommunity(client, mint),
      setupCommunity(client, mint),
      setupCommunity(client, mint),
      setupCommunity(client, mint),
    ])

    const response = await client.get('/communities').header(AUTH, BEARER)

    const body = response.body()

    const allCommunities = await Community.all()

    expect(body.meta.total).toEqual(allCommunities.length)
  })

  test('can fetch all members of a community', async ({ client, expect }) => {
    const { wallet, AUTH, BEARER, user } = await joinAndLogin(client)
    const { connection } = await setupSolana(wallet)

    const [{ mint }] = await Promise.all([
      createMintForOwner(connection, wallet),
      createMintForOwner(connection, wallet, 6345121867320, 6),
    ])
    const { community } = await setupCommunity(client, mint)

    await client.post(`/communities/${community.id}/memberships`).header(AUTH, BEARER)

    const response = await client
      .get(`/communities/${community.id}/memberships`)
      .header(AUTH, BEARER)

    const body = response.body()

    expect(body.meta.total).toEqual(1)
    expect(body.data[0].id).toEqual(user.id)
  })

  test('only a member of a community can fetch the members of a community', async ({
    client,
    expect,
  }) => {
    const { wallet, AUTH, BEARER } = await joinAndLogin(client)
    const { AUTH: NON_MEMBER_AUTH, BEARER: NON_MEMBER_BEARER } = await joinAndLogin(client)
    const { connection } = await setupSolana(wallet)

    const [{ mint }] = await Promise.all([
      createMintForOwner(connection, wallet),
      createMintForOwner(connection, wallet, 6345121867320, 6),
    ])
    const { community } = await setupCommunity(client, mint)

    await client.post(`/communities/${community.id}/memberships`).header(AUTH, BEARER)

    const response = await client
      .get(`/communities/${community.id}/memberships`)
      .header(NON_MEMBER_AUTH, NON_MEMBER_BEARER)

    expect(response.status()).toEqual(400)
    expect(response.body()).toMatchObject({
      message: 'E_NOT_A_MEMBER: Not a community member.',
    })
  })

  test('get all communities a user is a part of', async ({ client, expect }) => {
    const { wallet, AUTH, BEARER } = await joinAndLogin(client)
    const { connection } = await setupSolana(wallet)

    const [{ mint }] = await Promise.all([
      createMintForOwner(connection, wallet),
      createMintForOwner(connection, wallet, 6345121867320, 6),
    ])
    const { community } = await setupCommunity(client, mint)

    await client.post(`/communities/${community.id}/memberships`).header(AUTH, BEARER)

    const response = await client.get('/communities/self').header(AUTH, BEARER)

    const { meta, data } = response.body()

    expect(meta.total).toEqual(1)
    expect(data[0].id).toEqual(community.id)
  })
})
