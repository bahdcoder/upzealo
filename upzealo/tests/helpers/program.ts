import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js'
import { Account, createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'
import { Upzealo } from '../../target/types/upzealo'


export class ProgramHelper {
  public user: Keypair
  public wallet: Keypair
  public secondUser: Keypair
  public secondWallet: Keypair
  public mint: PublicKey
  public bounty: Keypair
  public userMintAccount: Account

  public connection = anchor.AnchorProvider.env().connection

  constructor(public program: Program<Upzealo>) {}

  async prepare() {
    this.wallet = await createFundedKeypair()
    this.secondWallet = await createFundedKeypair()

    this.user = Keypair.generate()
    this.secondUser = Keypair.generate()

    this.bounty = Keypair.generate()

    const [mint] = await Promise.all([
      createMint(this.connection, this.wallet, this.wallet.publicKey, this.wallet.publicKey, 6),
    ])

    this.mint = mint

    const [userMintAccount] = await Promise.all([
      getOrCreateAssociatedTokenAccount(
        this.connection,
        this.wallet,
        this.mint,
        this.wallet.publicKey
      ),
    ])

    this.userMintAccount = userMintAccount

    const amountToMint = 1000000000000

    await Promise.all([
      mintTo(
        this.connection,
        this.wallet,
        this.mint,
        this.userMintAccount.address,
        this.wallet,
        amountToMint
      ),
    ])
  }

  async getOrCreateAssociatedTokenAccount(mint: PublicKey, wallet: PublicKey) {
    return getOrCreateAssociatedTokenAccount(this.connection, this.wallet, mint, wallet)
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

export function pause(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([])
    }, milliseconds)
  })
}

export function helpers(program: Program<Upzealo>) {
  return new ProgramHelper(program)
}

export async function createFundedKeypair(lamports = LAMPORTS_PER_SOL * 50) {
  const wallet = Keypair.generate()
  const anchorWallet = anchor.AnchorProvider.env().wallet as any

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: anchorWallet.publicKey,
      toPubkey: wallet.publicKey,
      lamports,
    })
  )

  await sendAndConfirmTransaction(anchor.AnchorProvider.env().connection, transaction, [
    (anchor.AnchorProvider.env().wallet as any).payer,
  ])

  return wallet
}
