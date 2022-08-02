use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

use helpers::*;
use instructions::*;

pub mod helpers;
pub mod instructions;
pub mod state;

#[program]
pub mod upzealo {
    use super::*;

    /* Register a new user/wallet account */
    pub fn create_account(ctx: Context<CreateAccount>) -> Result<()> {
        instructions::create_account::handler(ctx)
    }

    /* Create a new bounty with an SPL token. */
    pub fn create_bounty(ctx: Context<CreateBounty>, amount: u64, bounty_authority_bump: u8) -> Result<()> {
        instructions::create_bounty::handler(ctx, amount, bounty_authority_bump)
    }

    /* Set the winner of the bounty */
    pub fn set_bounty_winner(ctx: Context<SetBountyWinner>) -> Result<()> {
        instructions::set_bounty_winner::handler(ctx)
    }

    /* Winner of bounty claims reward from bounty wallet */
    pub fn claim_bounty_reward(ctx: Context<ClaimBountyReward>) -> Result<()> {
        instructions::claim_bounty_reward::handler(ctx)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
