use anchor_lang::{prelude::*};
use anchor_spl::{associated_token::AssociatedToken,token::{self, Mint, Token, TokenAccount, Transfer}};

use crate::state::*;

/**
 * 
 * To create a bounty, the owner of the bounty will provide the spl token, the amount of the $bounty,
 * 
 */

#[derive(Accounts)]
#[instruction()]
pub struct ClaimBountyReward<'info> {
  #[account(mut)]
  pub wallet: Signer<'info>,

  /// CHECK:
  #[account(mut)]
  pub winner: AccountInfo<'info>,

  #[account(mut, constraint = wallet.key() == user.wallet)]
  pub user: Box<Account<'info, User>>,

  /// CHECK:
  #[account(mut, constraint = bounty.creator == user.key())]
  pub bounty: Box<Account<'info, Bounty>>,

  /// CHECK:
  #[account(mut, seeds = [bounty.key().as_ref()], bump)]
  pub bounty_authority: AccountInfo<'info>,

  #[account(mut)]
  pub mint: Box<Account<'info, Mint>>,

  #[account(init_if_needed, payer = wallet, associated_token::mint = mint, associated_token::authority = winner)]
  pub mint_destination: Box<Account<'info, TokenAccount>>,

  #[account(mut,
    token::mint = mint,
    token::authority = bounty_authority,
    constraint = bounty_wallet.mint == mint.key(),
  )]
  pub bounty_wallet: Box<Account<'info, TokenAccount>>,

  pub token_program: Program<'info, Token>,
  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
  pub associated_token_program: Program<'info, AssociatedToken>,
}

impl<'info> ClaimBountyReward<'info> {
  fn transfer_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
    CpiContext::new(
      self.token_program.to_account_info(),
      Transfer {
        from: self.bounty_wallet.to_account_info(),
        to: self.mint_destination.to_account_info(),
        authority: self.bounty_authority.to_account_info(),
      },
    )
  }
}

pub fn handler(ctx: Context<ClaimBountyReward>) -> Result<()> {
  let bounty = &mut ctx.accounts.bounty;

  bounty.paid = true;
  
  token::transfer(
    ctx
      .accounts
      .transfer_ctx()
      .with_signer(&[&ctx.accounts.bounty.seeds()]),
    ctx.accounts.bounty.amount
  )?;

  Ok(())
}
