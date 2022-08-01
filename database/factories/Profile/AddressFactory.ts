import Factory from '@ioc:Adonis/Lucid/Factory'
import Address, { SupportedBlockchains } from 'App/Models/Profile/Address'

import UserFactory from 'Database/factories/Profile/UserFactory'
import { getUserKeypair } from 'App/Helpers/Tests/Utils'

const supportedBlockchains = [
  SupportedBlockchains.ETHEREUM,
  SupportedBlockchains.POLYGON,
  SupportedBlockchains.SOLANA,
]

export default Factory.define(Address, () => {
  const { publicKey, signature } = getUserKeypair()

  console.log(`Public Key: ${publicKey}, Signature: ${signature}`)

  return {
    isDefault: false,
    publicKey,
    blockchain: supportedBlockchains[Math.floor(Math.random() * supportedBlockchains.length)],
  }
})
  .relation('user', () => UserFactory)
  .build()
