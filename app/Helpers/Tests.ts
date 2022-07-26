import Bs58 from 'bs58'
import nacl from 'tweetnacl'
import { blockchain } from 'Config/app'
import { Keypair } from '@solana/web3.js'
import { decodeUTF8 } from 'tweetnacl-util'
import { ApiClient } from '@japa/api-client'
import Address from 'App/Models/Profile/Address'

export async function joinAndLogin(client: ApiClient) {
  const { signature, publicKey } = getUserKeypair()

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
    user: address.user,
    accessToken: accessToken as string,
  }
}

export function getUserKeypair(signatureTemplate = blockchain.authenticationSignatureTemplate()) {
  const message = decodeUTF8(signatureTemplate)

  const key = Keypair.generate()

  const publicKey = key.publicKey.toBase58()
  const signature = Bs58.encode(nacl.sign.detached(message, key.secretKey))

  return {
    publicKey,
    signature,
    key,
    message,
  }
}
