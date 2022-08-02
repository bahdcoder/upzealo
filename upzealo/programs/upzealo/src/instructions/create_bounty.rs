use anchor_lang::{prelude::*};
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

use crate::state::*;

/**
 * 
 * To create a bounty, the owner of the bounty will provide the spl token, the amount of the $bounty,
 * 
 */

#[derive(Accounts)]
#[instruction()]
pub struct CreateBounty<'info> {
  #[account(mut)]
  pub wallet: Signer<'info>,

  #[account(mut, constraint = wallet.key() == user.wallet)]
  pub user: Box<Account<'info, User>>,

  #[account(init, payer = wallet, space = 8 + std::mem::size_of::<Bounty>())]
  pub bounty: Box<Account<'info, Bounty>>,

  /// CHECK:
  #[account(mut, seeds = [bounty.key().as_ref()], bump)]
  pub bounty_authority: AccountInfo<'info>,

  #[account(mut)]
  pub mint: Box<Account<'info, Mint>>,

  #[account(mut, token::mint = mint, token::authority = wallet)]
  pub mint_source: Box<Account<'info, TokenAccount>>,

    // The user account of the person creating the job contract
  #[account(init, seeds = [
      b"bounty_wallet".as_ref(),
      mint.key().as_ref(),
      bounty.key().as_ref(),
    ],
    payer = wallet,
    constraint = bounty_wallet.mint == mint.key(),
    token::mint = mint,
    token::authority = bounty_authority,
    bump
  )]
  pub bounty_wallet: Box<Account<'info, TokenAccount>>,

  pub token_program: Program<'info, Token>,
  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

impl<'info> CreateBounty<'info> {
  fn transfer_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
    CpiContext::new(
      self.token_program.to_account_info(),
      Transfer {
        from: self.mint_source.to_account_info(),
        to: self.bounty_wallet.to_account_info(),
        authority: self.wallet.to_account_info(),
      },
    )
  }
}

pub fn handler(ctx: Context<CreateBounty>, amount: u64, bounty_authority_bump: u8) -> Result<()> {
  let bounty = &mut ctx.accounts.bounty;

  bounty.amount = amount;
  bounty.mint = ctx.accounts.mint.key();

  // Authority keys
  bounty.authority = ctx.accounts.bounty_authority.key();
  bounty.authority_seed = bounty.key();
  bounty.authority_bump_seed = [bounty_authority_bump];

  bounty.creator = ctx.accounts.wallet.key();

  token::transfer(
    ctx
      .accounts
      .transfer_ctx()
      .with_signer(&[&ctx.accounts.bounty.seeds()]),
    amount,
  )?;

  Ok(())
}
