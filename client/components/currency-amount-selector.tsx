import Skeleton from 'react-loading-skeleton'
import { useQuery } from '@tanstack/react-query'
import Input from './input'
import { Select, SelectOption } from './select'
import {} from '@solana/web3.js'
import { useApiAxiosInstance } from '../helpers/axios-client'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { formatNumber } from '../helpers/currencies'
import classNames from 'classnames'

export interface SupportedCurrency {
  decimals: number
  isNft: false
  logo: string
  mint: string
  balance: number
  symbol: string
}

const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

export function CurrencyAmountSelector({
  onChange,
  error,
}: PropsWithChildren<{
  onChange?: (value: {
    amount: number
    currency: string
    balance: string
    decimals: number
  }) => void
  error?: string
}>) {
  const [amount, setAmount] = useState(0)
  const [token, setToken] = useState<SelectOption & { balance: string; decimals: number }>()
  const instance = useApiAxiosInstance()
  const { isLoading, data: tokens = [] } = useQuery<SupportedCurrency[]>(
    ['currencies-and-balances'],
    async () => {
      const response = await instance.get('/profiles/wallets/balances')

      const usdcAccount = response.data.accounts.find(
        (option: SupportedCurrency) => option.mint === USDC_MINT
      )

      if (usdcAccount) {
        setToken({
          id: usdcAccount.mint,
          name: usdcAccount.symbol,
          image: usdcAccount.logo,
          decimals: usdcAccount.decimals,
          balance: computeBalance(usdcAccount).toString(),
        })
      } else {
        const first = response.data.accounts[0]
        setToken({
          id: first.mint,
          name: first.symbol,
          image: first.logo,
          decimals: first.decimals,
          balance: computeBalance(first).toString(),
        })
      }

      return response.data.accounts
    },
    {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  )

  const selectOptions = useMemo(
    () =>
      tokens.map((token) => ({
        id: token.mint,
        name: `${token.symbol} (${formatNumber(computeBalance(token))})`,
        image: token.logo,
        decimals: token.decimals,
        balance: computeBalance(token),
      })),
    [tokens]
  )

  function computeBalance(token: SupportedCurrency) {
    // const amount = token.balance / 10 ** token.decimals
    return token.balance
  }

  useEffect(() => {
    onChange?.({
      amount,
      currency: token?.id!,
      balance: token?.balance!,
      decimals: token?.decimals!,
    })

    // eslint-disable-next-line
  }, [token, amount])

  return (
    <>
      {isLoading ? (
        <Skeleton
          count={1}
          baseColor={'#000000'}
          highlightColor={'#1F2024'}
          duration={1}
          height={48}
          borderRadius={8}
        />
      ) : null}

      {isLoading ? null : (
        <div className="w-full">
          <label htmlFor="bounty_amount" className="text-sm text-white font-bold">
            Bounty amount
          </label>
          <div className="flex items-center relative my-4 w-full ">
            <Input
              id="bounty_amount"
              className="w-full"
              placeholder="Amount"
              type="number"
              error={error}
              onChange={(event: any) => setAmount(event.target.value)}
            />
            <div
              className={classNames('absolute inset-y-0 right-0 flex items-center', {
                'mt-[-1.5rem]': error !== undefined,
              })}
            >
              <Select
                options={selectOptions}
                onChange={(option) => {
                  setToken(option as any)
                }}
                defaultOption={selectOptions.find((option) => option.id === USDC_MINT)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
