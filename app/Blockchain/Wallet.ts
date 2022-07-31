import { blockchain } from 'Config/app'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import ConvertStringToNumber from 'convert-string-to-number'
import { Connection, ParsedAccountData } from '@solana/web3.js'

export interface TokenAccount {
  isNft: boolean
  mint: string
  balance: number
}

export class Wallet {
  public connection: Connection

  constructor(public publicKey: string) {
    this.connection = new Connection(blockchain.rpcUrl, 'confirmed')
  }

  public async getAllSplTokens(): Promise<TokenAccount[]> {
    const accounts = await this.connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
      filters: [
        {
          dataSize: 165,
        },
        {
          memcmp: {
            offset: 32,
            bytes: this.publicKey,
          },
        },
      ],
    })

    return accounts.map((account) => {
      const info = (account.account.data as ParsedAccountData).parsed.info

      const isNft = info.tokenAmount.amount === '1' && info.tokenAmount.decimals === 0

      const amount = ConvertStringToNumber(info.tokenAmount.amount)
      const balance = amount / 10 ** info.tokenAmount.decimals

      return {
        isNft,
        balance,
        mint: info.mint,
        owner: info.owner,
      }
    })
  }
}
