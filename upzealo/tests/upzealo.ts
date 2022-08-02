import assert from 'assert'
import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { BN } from 'bn.js'
import { Upzealo } from '../target/types/upzealo'
import { helpers } from './helpers/program'
import { getAssociatedTokenAddress } from '@solana/spl-token'

describe('upzealo', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.Upzealo as Program<Upzealo>

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
        })
        .signers([helper.wallet, helper.user])
        .rpc(),
      program.methods
        .createAccount()
        .accounts({
          user: winnerUser,
          wallet: winnerWallet,
        })
        .signers([helper.secondWallet, helper.secondUser])
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
    assert.equal(bountyAccount.creator.toBase58(), wallet.toBase58())

    const mintDestination = await getAssociatedTokenAddress(mint, winnerWallet)

    await program.methods
      .setBountyWinner()
      .accounts({
        wallet,
        user,
        winner: winnerUser,
        bounty,
      })
      .signers([helper.wallet])
      .rpc()

    await program.methods
      .claimBountyReward()
      .accounts({
        wallet: winnerWallet,
        user: winnerUser,
        mint,
        mintDestination,
        bountyWallet,
        bounty,
        bountyAuthority,
      })
      .signers([helper.secondWallet])
      .rpc()
  })
})
