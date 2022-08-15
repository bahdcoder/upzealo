import { blockchain } from 'Config/app'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import ConvertStringToNumber from 'convert-string-to-number'
import { Connection, ParsedAccountData } from '@solana/web3.js'

export interface TokenAccount {
  isNft: boolean
  mint: string
  balance: number
  logoUrl?: string
  decimals: number
}

export interface SupportedCurrency {
  symbol: string
  logo: string
  mint: string
}

export class Wallet {
  public connection: Connection

  constructor(public publicKey: string) {
    this.connection = new Connection(blockchain.rpcUrl, 'confirmed')
  }

  public async getAllSupportedSplTokens() {
    const accounts = await this.getAllSplTokens()

    const supportedCurrencies = this.getSupportedCurrencies()

    const tokenAccounts = accounts
      .filter((account) =>
        supportedCurrencies.map((currency) => currency.mint).includes(account.mint)
      )
      .map((account) => ({
        ...account,
        ...supportedCurrencies.find((currency) => currency.mint === account.mint),
      }))

    supportedCurrencies.forEach((currency) => {
      if (!tokenAccounts.find((account) => account.mint === currency.mint)) {
        tokenAccounts.push({
          ...currency,
          decimals: 0,
          balance: 0,
          isNft: false,
        })
      }
    })

    return tokenAccounts
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
        decimals: info.tokenAmount.decimals,
      }
    })
  }

  private getSupportedCurrencies(): SupportedCurrency[] {
    const isDevnet = blockchain.environment === 'devnet'

    return [
      {
        symbol: 'USDC',
        logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
        mint: isDevnet
          ? 'E5TGw3nHURLMydUkUd42LwNzjuLYoo22KCm7CrnUSxiC'
          : 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      },
      {
        symbol: 'MNGO',
        logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11171.png',
        mint: isDevnet ? '' : 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
      },
      {
        symbol: 'SHDW',
        logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y/logo.png',
        mint: isDevnet
          ? 'BXJ5SSmMb4Vp9U45enozuNcdSpDdssvymHyLB4jj2EDX'
          : 'SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y',
      },
      {
        symbol: 'JELLY',
        logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9WMwGcY6TcbSfy9XPpQymY3qNEsvEaYL3wivdwPG2fpp/logo.png',
        mint: isDevnet ? '' : '9WMwGcY6TcbSfy9XPpQymY3qNEsvEaYL3wivdwPG2fpp',
      },
    ].filter((token) => token.mint)
  }
}
