import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  Signer,
} from '@solana/web3.js'
import { Program, AnchorProvider, BN } from '@project-serum/anchor'

import IDL from './idl.json'
import { Upzealo } from './types'
import { helpers, ProgramHelper } from './helpers'
import { getAssociatedTokenAddress } from '@solana/spl-token'

import { config } from '../config'

export type CreateBountyTransactionPayload = {
  walletAddress: string
  userAddress: string
  mintAddress: string
  amountAsNumber: number
}

export const SolanaProgram = new (class {
  private program: Program<Upzealo>
  private connection: Connection
  private provider: AnchorProvider
  private helpers: ProgramHelper

  constructor() {
    this.connection = new Connection(config.solanaRpcUrl, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 120000,
    })

    this.provider = new AnchorProvider(this.connection, {} as any, {
      commitment: 'confirmed',
    })

    this.program = new Program(IDL as any, config.solanaProgramId, this.provider)
    this.helpers = helpers(this.program)
  }

  async createAccountTransaction(walletAddress: string, payerAddress: string) {
    const user = Keypair.generate()
    const payer = new PublicKey(payerAddress)
    const wallet = new PublicKey(walletAddress)

    const transaction = await this.program.methods
      .createAccount()
      .accounts({
        user: user.publicKey,
        wallet,
        payer,
      })
      .signers([user])
      .transaction()

    const recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash
    transaction.recentBlockhash = recentBlockhash

    return { transaction, user }
  }

  async createAccount(walletAddress: string, payerAddress: string, signers: Signer[]) {
    const { transaction, user } = await this.createAccountTransaction(walletAddress, payerAddress)

    const signature = await this.sendAndConfirmTransaction(transaction, signers)

    return { user, signature }
  }

  async createBountyTransaction({
    walletAddress,
    userAddress,
    amountAsNumber,
    mintAddress,
  }: CreateBountyTransactionPayload) {
    const user = new PublicKey(userAddress)
    const mint = new PublicKey(mintAddress)
    const wallet = new PublicKey(walletAddress)

    const bounty = Keypair.generate()
    const [bountyWallet] = await this.helpers.deriveBountyWalletPDA(mint, bounty.publicKey)

    const mintSource = await getAssociatedTokenAddress(mint, wallet)

    const amount = new BN(amountAsNumber)

    const [bountyAuthority, bountyAuthorityBump] = await this.helpers.deriveBountyAuthorityPDA(
      bounty.publicKey
    )

    const transaction = await this.program.methods
      .createBounty(amount, bountyAuthorityBump)
      .accounts({
        user,
        wallet,
        bounty: bounty.publicKey,
        mint,
        mintSource,
        bountyWallet,
        bountyAuthority,
      })
      .signers([bounty])
      .transaction()

    await this.setTransactionOptions(transaction, wallet)

    return { transaction, bounty, user, bountyWallet, bountyAuthority, mintSource, mint, amount }
  }

  async setTransactionOptions(transaction: Transaction, feePayer: string | PublicKey) {
    const recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash
    transaction.recentBlockhash = recentBlockhash

    transaction.feePayer = new PublicKey(feePayer)
  }

  async createBounty(payload: CreateBountyTransactionPayload, signers: Signer[]) {
    const { transaction, ...rest } = await this.createBountyTransaction(payload)
    const signature = await this.sendAndConfirmTransaction(transaction, signers)

    return { ...rest, signature, transaction }
  }

  async sendAndConfirmTransaction(transaction: Transaction, signers: Signer[]) {
    const signature = await sendAndConfirmTransaction(this.connection, transaction, signers)

    return signature
  }
})()
