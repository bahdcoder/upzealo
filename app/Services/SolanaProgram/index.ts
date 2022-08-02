import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js'
import { Program, AnchorProvider, BN } from '@project-serum/anchor'

import { blockchain } from 'Config/app'

import IDL from 'App/Services/SolanaProgram/idl.json'
import { Upzealo } from 'App/Services/SolanaProgram/types'
import { helpers, ProgramHelper } from 'App/Services/SolanaProgram/helpers'
import { getAssociatedTokenAddress } from '@solana/spl-token'

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
    this.connection = new Connection(blockchain.rpcUrl, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 120000,
    })

    this.provider = new AnchorProvider(this.connection, {} as any, {
      commitment: 'confirmed',
    })

    this.program = new Program(IDL as any, blockchain.solanaProgramId, this.provider)
    this.helpers = helpers(this.program)
  }

  async createAccountTransaction(walletAddress: string) {
    const user = Keypair.generate()
    const wallet = new PublicKey(walletAddress)

    const transaction = await this.program.methods
      .createAccount()
      .accounts({
        user: user.publicKey,
        wallet,
      })
      .signers([user])
      .transaction()

    return { transaction, user }
  }

  async createAccount(walletAddress: string) {
    const { transaction, user } = await this.createAccountTransaction(walletAddress)

    const signature = await this.sendAndConfirmTransaction(transaction)

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
        bounty,
        mint,
        mintSource,
        bountyWallet,
        bountyAuthority,
      })
      .signers([bounty])
      .transaction()

    return { transaction, bounty, user, bountyWallet, bountyAuthority, mintSource, mint, amount }
  }

  async createBounty(payload: CreateBountyTransactionPayload) {
    const { transaction, ...rest } = await this.createBountyTransaction(payload)
    const signature = await this.sendAndConfirmTransaction(transaction)

    return { ...rest, signature, transaction }
  }

  async sendAndConfirmTransaction(transaction: Transaction) {
    const signature = await sendAndConfirmTransaction(this.connection, transaction, [])

    return signature
  }
})()
