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
import { WalletContextState } from '@solana/wallet-adapter-react'

export type CreateBountyTransactionPayload = {
  walletAddress: string
  userAddress: string
  mintAddress: string
  amountAsNumber: number
}

export const SolanaProgram = class {
  public program: Program<Upzealo>
  private connection: Connection
  private provider: AnchorProvider
  private helpers: ProgramHelper

  constructor(wallet: WalletContextState) {
    this.connection = new Connection(config.solanaRpcUrl, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 120000,
    })

    this.provider = new AnchorProvider(this.connection, wallet as any, {
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

  async claimBountyTransaction({
    mintAddress,
    winnerWalletAddress,
    bountyAddress,
    userAddress,
    bountyCreatorAddress,
  }: {
    bountyAddress: string
    userAddress: string
    winnerWalletAddress: string
    mintAddress: string
    bountyCreatorAddress: string
  }) {
    const wallet = new PublicKey(bountyCreatorAddress)
    const user = new PublicKey(userAddress)
    const mint = new PublicKey(mintAddress)
    const winnerWallet = new PublicKey(winnerWalletAddress)
    const bounty = new PublicKey(bountyAddress)
    const [bountyWallet] = await this.helpers.deriveBountyWalletPDA(mint, bounty)
    const [bountyAuthority] = await this.helpers.deriveBountyAuthorityPDA(bounty)
    const mintDestination = await getAssociatedTokenAddress(
      new PublicKey(mintAddress),
      new PublicKey(winnerWalletAddress)
    )

    const signature = await this.program.methods
      .claimBountyReward()
      .accounts({
        wallet,
        user,
        mint,
        mintDestination,
        bountyWallet,
        bounty,
        bountyAuthority,
        winner: winnerWallet,
      })
      .signers([])
      .rpc()

    return { signature }
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

    const signature = await this.program.methods
      .createBounty(amount, bountyAuthorityBump)
      .accounts({
        user,
        wallet,
        mint,
        mintSource,
        bountyWallet,
        bountyAuthority,
        bounty: bounty.publicKey,
      })
      .signers([bounty])
      .rpc()

    return { signature, bounty, user, bountyWallet, bountyAuthority, mintSource, mint, amount }
  }

  async setTransactionOptions(transaction: Transaction, feePayer: string | PublicKey) {
    const recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash
    transaction.recentBlockhash = recentBlockhash

    transaction.feePayer = new PublicKey(feePayer)
  }

  async sendAndConfirmTransaction(transaction: Transaction, signers: Signer[]) {
    const signature = await sendAndConfirmTransaction(this.connection, transaction, signers)

    return signature
  }
}
