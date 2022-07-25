import { Keypair } from '@solana/web3.js'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Address, { SupportedBlockchains } from 'App/Models/Profile/Address'

import UserFactory from 'Database/factories/Profile/UserFactory'

const supportedBlockchains = [
  SupportedBlockchains.ETHEREUM,
  SupportedBlockchains.POLYGON,
  SupportedBlockchains.SOLANA,
]

export default Factory.define(Address, () => {
  return {
    isDefault: false,
    publicKey: Keypair.generate().publicKey.toBase58(),
    blockchain: supportedBlockchains[Math.floor(Math.random() * supportedBlockchains.length)],
  }
})
  .relation('user', () => UserFactory)
  .build()
