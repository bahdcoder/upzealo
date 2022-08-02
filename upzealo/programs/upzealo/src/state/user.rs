
use anchor_lang::prelude::*;

#[repr(C)]
#[account]
#[derive(Debug)]
pub struct User {
    pub wallet: Pubkey,
}
