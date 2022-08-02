import { Program } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { Upzealo } from 'App/Services/SolanaProgram/types'

export class ProgramHelper {
  constructor(public program: Program<Upzealo>) {}

  findProgramAddress(seeds: Array<Buffer | Uint8Array | string | PublicKey>) {
    return PublicKey.findProgramAddress(
      seeds.map((seed) => {
        if (typeof seed == 'string') {
          return Buffer.from(seed)
        }

        if ('toBytes' in seed) {
          return seed.toBytes()
        }

        return seed
      }),
      this.program.programId
    )
  }

  deriveBountyPDA(userAccount: PublicKey) {
    return this.findProgramAddress(['bounty', userAccount])
  }

  deriveBountyAuthorityPDA(bounty: PublicKey) {
    return this.findProgramAddress([bounty])
  }

  deriveBountyWalletPDA(mint: PublicKey, bounty: PublicKey) {
    return this.findProgramAddress(['bounty_wallet', mint, bounty])
  }
}

export function helpers(program: Program<Upzealo>) {
  return new ProgramHelper(program)
}
