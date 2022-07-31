import { test } from '@japa/runner'
import {
  createMintForOwner,
  joinAndLogin,
  setupCommunity,
  setupSolana,
} from 'App/Helpers/Tests/Utils'

test.group('join communities', () => {
  test('can join a community gated with the required tokens in their wallet', async ({
    client,
    expect,
  }) => {
    const { wallet, AUTH, BEARER, user } = await joinAndLogin(client)
    const { connection } = await setupSolana(wallet)

    const [{ mint }] = await Promise.all([
      createMintForOwner(connection, wallet),
      createMintForOwner(connection, wallet, 6345121867320, 6),
    ])
    const { community } = await setupCommunity(client, mint)

    const response = await client
      .post(`/communities/${community.id}/memberships`)
      .header(AUTH, BEARER)

    const body = response.body()

    expect(body.membership.userId).toEqual(user.id)
    expect(body.membership.status).toEqual('APPROVED')
    expect(body.membership.communityId).toEqual(community.id)
  })

  test('cannot join a gated commmunity without a whitelisted token in wallet', async ({
    client,
    expect,
  }) => {
    const { wallet } = await joinAndLogin(client)
    const { AUTH: SECOND_AUTH, BEARER: SECOND_BEARER } = await joinAndLogin(client)
    const { connection } = await setupSolana(wallet)

    const { mint } = await createMintForOwner(connection, wallet)

    const { community } = await setupCommunity(client, mint)

    const response = await client
      .post(`/communities/${community.id}/memberships`)
      .header(SECOND_AUTH, SECOND_BEARER)

    expect(response.status()).toEqual(400)
    expect(response.body().message).toEqual('E_NOT_WHITELISTED: Wallet not whitelisted.')
  })
})
