use anchor_lang::prelude::*;
use anchor_spl::token::{Token};

use crate::state::*;

/**
 * 
 * To create a bounty, the owner of the bounty will provide the spl token, the amount of the $bounty,
 * 
 */

#[derive(Accounts)]
#[instruction()]
pub struct CreateAccount<'info> {
  #[account(mut)]
  pub wallet: Signer<'info>,

  #[account(init, payer = wallet, space = 8 + std::mem::size_of::<User>())]
  pub user: Box<Account<'info, User>>,

  pub token_program: Program<'info, Token>,
  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

pub fn handler(ctx: Context<CreateAccount>) -> Result<()> {
  let user = &mut ctx.accounts.user;

  user.wallet = ctx.accounts.wallet.key();

  Ok(())
}
