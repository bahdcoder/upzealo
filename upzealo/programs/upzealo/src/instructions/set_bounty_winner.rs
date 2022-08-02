use anchor_lang::{prelude::*};

use crate::state::*;

#[derive(Accounts)]
#[instruction()]
pub struct SetBountyWinner<'info> {
  #[account(mut)]
  pub wallet: Signer<'info>,

  /// CHECK:
  #[account(mut)]
  pub winner: Box<Account<'info, User>>,

  #[account(mut, constraint = wallet.key() == user.wallet)]
  pub user: Box<Account<'info, User>>,

  #[account(mut, constraint = bounty.creator == wallet.key())]
  pub bounty: Box<Account<'info, Bounty>>,

  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

pub fn handler(ctx: Context<SetBountyWinner>) -> Result<()> {
  let bounty = &mut ctx.accounts.bounty;

  bounty.winner = ctx.accounts.winner.key();
  bounty.winner_set = true;

  Ok(())
}
