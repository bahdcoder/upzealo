import Bs58 from 'bs58'
import nacl from 'tweetnacl'
import { blockchain } from 'Config/app'
import { decodeUTF8 } from 'tweetnacl-util'
import { ApiClient } from '@japa/api-client'
import { Keypair, LAMPORTS_PER_SOL, Connection, PublicKey } from '@solana/web3.js'
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'

import Address from 'App/Models/Profile/Address'
import CommunityFactory from 'Database/factories/Community/CommunityFactory'
import Community from 'App/Models/Community/Community'

export async function setupCommunity(client: ApiClient, mint: PublicKey) {
  const { AUTH, BEARER, ...rest } = await joinAndLogin(client)

  const newCommunity = (await CommunityFactory.apply('tokens').make()).$attributes

  const tokensList = [mint.toBase58()]

  const response = await client
    .post('/communities')
    .json({
      ...newCommunity,
      tokensList,
    })
    .header(AUTH, BEARER)

  const body = response.body()

  const community = await Community.findOrFail(body.id)

  return {
    community,
    owner: {
      ...rest,
      ...rest.user,
      AUTH,
      BEARER,
    },
  }
}

export async function joinAndLogin(client: ApiClient) {
  const { signature, publicKey, wallet } = getUserKeypair()

  await client.post('/auth/join').field('signature', signature).field('publicKey', publicKey)

  const response = await client
    .post('/auth/login')
    .field('signature', signature)
    .field('publicKey', publicKey)

  const { accessToken } = response.body()

  const address = await Address.query().where('publicKey', publicKey).preload('user').firstOrFail()

  const AUTH = 'Authorization'
  const BEARER = `Bearer ${accessToken}`

  return {
    AUTH,
    BEARER,
    address,
    response,
    signature,
    publicKey,
    wallet,
    user: address.user,
    accessToken: accessToken as string,
  }
}

export function getUserKeypair(signatureTemplate = blockchain.authenticationSignatureTemplate()) {
  const message = decodeUTF8(signatureTemplate)

  const wallet = Keypair.generate()

  const publicKey = wallet.publicKey.toBase58()
  const signature = Bs58.encode(nacl.sign.detached(message, wallet.secretKey))

  return {
    publicKey,
    signature,
    key: wallet,
    message,
    wallet,
  }
}

export function pause(timeout = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([])
    }, timeout)
  })
}

export async function setupSolana(wallet: Keypair) {
  const connection = new Connection(blockchain.rpcUrl, 'confirmed')

  const signature = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL)

  const blockhash = await connection.getLatestBlockhash()

  await connection.confirmTransaction({ signature, ...blockhash }, 'confirmed')

  return {
    connection,
  }
}

export async function createMintForOwner(
  connection: Connection,
  wallet: Keypair,
  totalToMint = 1,
  decimals = 0
) {
  const mint = await createMint(connection, wallet, wallet.publicKey, wallet.publicKey, decimals)

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    wallet.publicKey
  )

  await mintTo(connection, wallet, mint, tokenAccount.address, wallet, totalToMint)

  return {
    mint,
    tokenAccount,
  }
}
