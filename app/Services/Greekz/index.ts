import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'

import { PublicKey, Connection } from '@solana/web3.js'
import { AlterEgo } from './types'
import IDL from './idl.json'

export function getEnv() {
  return {
    clusterUrl:
      'https://black-shy-sound.solana-mainnet.quiknode.pro/7a40627b7c111ebe8366dff3a957407af84f74ca/',
    programAddress: new PublicKey('6R3PTQVXaawcKP8Ezzziuf5Zo3SBVG2Q3vyDmK7kMywY'),
  }
}

export function getProgram(wallet: any) {
  const { clusterUrl, programAddress } = getEnv()

  const connection = new Connection(clusterUrl, {
    commitment: 'processed',
  })

  const provider = new anchor.AnchorProvider(connection, wallet as any, {
    commitment: 'processed',
  })

  const program = new Program(IDL as any, programAddress.toBase58(), provider)

  return {
    provider,
    connection,
    program: program as Program<AlterEgo>,
  }
}

export class ProgramHelper {
  public connection = new Connection(getEnv().clusterUrl)

  constructor(public program: Program<AlterEgo>) {}

  deriveRascalPDA(mint: PublicKey) {
    return this.findProgramAddress(['rascal', mint])
  }

  deriveRascalBoxPDA(mint: PublicKey) {
    return this.findProgramAddress(['rascal_box', mint])
  }

  deriveRascalPhase(mint: PublicKey) {
    return this.findProgramAddress(['rascal_phase', mint])
  }

  derivePhaseOnePDA() {
    return this.findProgramAddress(['phase_one'])
  }

  derivePhaseTwoPDA() {
    return this.findProgramAddress(['phase_two'])
  }

  deriveRascalAuthority(mint: PublicKey) {
    return this.findProgramAddress([mint])
  }

  deriveHolderPDA(banana: PublicKey) {
    return this.findProgramAddress(['holder', banana])
  }

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
}

export function helpers(program: Program<AlterEgo>) {
  return new ProgramHelper(program)
}
