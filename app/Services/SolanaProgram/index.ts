import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  Signer,
} from '@solana/web3.js'
import { Program, AnchorProvider, BN } from '@project-serum/anchor'
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  BundlrStorageDriver,
  MetaplexFile,
  Nft,
  JsonMetadataAttribute,
} from '@metaplex-foundation/js'
import { freezeAccount, setAuthority, AuthorityType, getMint } from '@solana/spl-token'

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

    await this.setTransactionOptions(transaction, walletAddress)

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

  async updateNft(
    wallet: Keypair,
    resumeMint: string,
    { file, avatarFile }: { file: MetaplexFile; avatarFile: MetaplexFile },
    name: string,
    attributes: JsonMetadataAttribute[]
  ) {
    const metaplex = Metaplex.make(this.connection)
      .use(keypairIdentity(wallet))
      .use(bundlrStorage())

    const isDevnet = blockchain.environment === 'devnet'

    if (isDevnet) {
      metaplex.use(
        bundlrStorage({
          address: 'https://devnet.bundlr.network',
          providerUrl: blockchain.rpcUrl,
          timeout: 60000,
        })
      )
    }

    const storage = metaplex.storage().driver() as BundlrStorageDriver

    ;(await storage.bundlr()).fund(5000)

    const nft = await metaplex.nfts().findByMint(new PublicKey(resumeMint)).run()

    const { uri, metadata } = await metaplex
      .nfts()
      .uploadMetadata({
        name,
        image: avatarFile,
        properties: {
          files: [
            {
              type: 'pdf',
              uri: file,
            },
          ],
        },
        attributes,
      })
      .run()

    await metaplex
      .nfts()
      .update(nft, {
        uri,
        name,
      })
      .run()

    return {
      uri,
      mint: nft.mint,
      resumePdf: metadata.properties.files[0].uri,
    }
  }

  async uploadNft(
    wallet: Keypair,
    owner: string,
    { file, avatarFile }: { file: MetaplexFile; avatarFile: MetaplexFile },
    name: string,
    attributes: JsonMetadataAttribute[]
  ) {
    const tokenOwner = new PublicKey(owner)
    const metaplex = Metaplex.make(this.connection)
      .use(keypairIdentity(wallet))
      .use(bundlrStorage())

    const isDevnet = blockchain.environment === 'devnet'

    if (isDevnet) {
      metaplex.use(
        bundlrStorage({
          address: 'https://devnet.bundlr.network',
          providerUrl: blockchain.rpcUrl,
          timeout: 60000,
        })
      )
    }

    const storage = metaplex.storage().driver() as BundlrStorageDriver

    ;(await storage.bundlr()).fund(5000)

    const { uri, metadata } = await metaplex
      .nfts()
      .uploadMetadata({
        name,
        image: avatarFile,
        properties: {
          files: [
            {
              type: 'pdf',
              uri: file,
            },
          ],
        },
        attributes,
      })
      .run()

    console.log({ uri, metadata, tokenOwner: tokenOwner.toBase58() })

    const { nft }: { nft: Nft } = await metaplex
      .nfts()
      .create({
        uri,
        name,
        tokenOwner,
        mintAuthority: wallet,
        updateAuthority: wallet,
      })
      .run()

    return {
      uri,
      mint: nft.mint.address.toBase58(),
      resumePdf: metadata.properties.files[0].uri,
    }
  }
})()
