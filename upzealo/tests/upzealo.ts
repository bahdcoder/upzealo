import assert from 'assert'
import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { BN } from 'bn.js'
import { Upzealo } from '../target/types/upzealo'
import { createFundedKeypair, helpers } from './helpers/program'
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token'

describe('upzealo', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.Upzealo as Program<Upzealo>

  const { connection } = anchor.AnchorProvider.env()

  const helper = helpers(program)

  beforeEach(async () => {
    await helper.prepare()
  })

  it('user creates a bounty -> set bounty winner -> winner claims bounty', async () => {
    const wallet = helper.wallet.publicKey
    const winnerWallet = helper.secondWallet.publicKey

    const user = helper.user.publicKey
    const winnerUser = helper.secondUser.publicKey

    const bounty = helper.bounty.publicKey

    const payer = await createFundedKeypair()

    const amount = new BN(40000000)
    const [bountyAuthority, bountyAuthorityBump] = await helper.deriveBountyAuthorityPDA(bounty)
    const mint = helper.mint
    const mintSource = helper.userMintAccount.address
    const [bountyWallet] = await helper.deriveBountyWalletPDA(mint, bounty)

    await Promise.all([
      program.methods
        .createAccount()
        .accounts({
          user,
          wallet,
          payer: payer.publicKey
        })
        .signers([payer, helper.user])
        .rpc(),
      program.methods
        .createAccount()
        .accounts({
          user: winnerUser,
          wallet: winnerWallet,
          payer: payer.publicKey
        })
        .signers([payer, helper.secondUser])
        .rpc(),
    ])

    await program.methods
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
      .signers([helper.wallet, helper.bounty])
      .rpc()

    let bountyAccount = await program.account.bounty.fetch(bounty)

    assert.equal(bountyAccount.amount.toNumber(), amount.toNumber())
    assert.equal(bountyAccount.creator.toBase58(), user.toBase58())

    const mintDestination = await getAssociatedTokenAddress(mint, winnerWallet)

    await program.methods
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
      .signers([helper.wallet])
      .rpc()

    const mintDestinationAccount = await getAccount(connection, mintDestination)

    const paidBountyAccount = await program.account.bounty.fetch(bounty)

    assert.equal(paidBountyAccount.paid, true)
    assert.equal(Number(mintDestinationAccount.amount), amount.toNumber())
  })
})
