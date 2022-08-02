
use anchor_lang::prelude::*;

#[repr(C)]
#[account]
#[derive(Debug)]
pub struct Bounty {
    pub creator: Pubkey,
    pub winner: Pubkey,
    pub amount: u64,
    pub mint: Pubkey,

    pub winner_set: bool,

    pub authority: Pubkey,
    pub authority_seed: Pubkey,
    pub authority_bump_seed: [u8; 1],

    pub paid: bool,
}

impl Bounty {
    pub fn seeds(&self) -> [&[u8]; 2] {
        [self.authority_seed.as_ref(), &self.authority_bump_seed]
    }
}
