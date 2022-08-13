import Bs58 from 'bs58'
import { useWallet } from '@solana/wallet-adapter-react'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'
import { useApiAxiosInstance, useAxiosInstance } from '../helpers/axios-client'
import { config } from '../helpers/config'
import { Modal } from './modal'
import { ActionButton } from './button'
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base'
import {
  PhantomWalletAdapter,
  PhantomWalletName,
  SlopeWalletAdapter,
  SlopeWalletName,
  SolflareWalletAdapter,
  SolflareWalletName,
} from '@solana/wallet-adapter-wallets'
import { OnboardingStep } from '../store/auth'

interface AuthState {
  accessToken: string
  streamAccessToken: string
  userId: string
  authenticated: boolean
}

export function ConnectWallet({
  authState,
  setAuthState,
  userOnboarding,
  setUserOnboarding,
  onAuthenticated,
  setOnboardingSteps,
}: PropsWithChildren<{
  authState: AuthState
  setAuthState: Dispatch<SetStateAction<AuthState>>

  onAuthenticated: (response: any) => void

  userOnboarding: boolean
  setUserOnboarding: Dispatch<SetStateAction<boolean>>

  setOnboardingSteps: Dispatch<SetStateAction<OnboardingStep[]>>
}>) {
  const [walletManuallySelected, setWalletManuallySelected] = useState(false)
  const { select, connected, connect, wallet, connecting, publicKey, signMessage } = useWallet()

  const instance = useAxiosInstance()
  const apiInstance = useApiAxiosInstance()

  const handleWalletClick = (walletName: WalletName) => {
    if (!wallet || (wallet && wallet.adapter.name !== walletName)) {
      select(walletName)
      setWalletManuallySelected(true)

      return
    }

    if (
      wallet !== null &&
      !connected &&
      !connecting &&
      [WalletReadyState.Installed, WalletReadyState.Loadable].includes(wallet.readyState)
    ) {
      connect()

      return
    }

    if (wallet && connected) {
      signWalletMessage()
    }
  }

  const {
    isLoading: isSigningMessage,
    isError: failedSigningMessage,
    mutate: signWalletMessage,
  } = useMutation(async () => {
    const publicKeyBase58 = publicKey?.toBase58()
    const message = new TextEncoder().encode(config.authenticationSignatureTemplate())

    const signature = await signMessage?.(message)

    const response = await instance.post(`/api/auth/login`, {
      publicKey: publicKeyBase58,
      signature: Bs58.encode(signature!),
    })

    setAuthState({
      authenticated: true,
      ...response.data,
    })

    setOnboardingSteps(response.data.user.onboardingSteps.steps)

    if (response.data.user.onboardingSteps.completedOnboarding === false) {
      setUserOnboarding(true)
    }

    onAuthenticated(response.data.user)
  })

  useEffect(() => {
    if (
      connected &&
      wallet &&
      publicKey &&
      // walletManuallySelected &&
      !isSigningMessage &&
      !failedSigningMessage &&
      !authState.authenticated
    ) {
      signWalletMessage()
    }
  }, [
    connected,
    connecting,
    wallet,
    publicKey,
    authState,
    isSigningMessage,
    failedSigningMessage,
    walletManuallySelected,
  ])

  useEffect(() => {
    if (wallet && walletManuallySelected && !connected && !connecting) {
      connect()
    }
  }, [walletManuallySelected, wallet, connected, connecting])

  const ongoingOperation = connecting || isSigningMessage

  return (
    <Modal
      hideHeading
      size="medium"
      setIsOpen={() => {}}
      isOpen={!authState.authenticated}
      positionClasses="fixed inset-x-0 overflow-y-auto top-0 lg:mt-24"
    >
      <div className="px-4 pt-16 lg:pt-0">
        <h2 className="font-bold text-xl mb-6 text-center">Upzealo (logo here)</h2>
        <p className="mt-4 text-white font-medium text-2xl text-center">Welcome to Upzealo</p>

        {isSigningMessage ? null : (
          <p className="mt-2 text-center">Please select a sign-in method</p>
        )}

        {isSigningMessage ? (
          <div className="mt-8 text-center">Please sign the message with your wallet.</div>
        ) : null}

        <div className="flex w-full flex-col my-8 space-y-4">
          <ActionButton
            className=" text-white font-bold"
            onClick={(event) => handleWalletClick(PhantomWalletName)}
            isDisabled={ongoingOperation}
            isLoading={ongoingOperation && wallet?.adapter?.name === PhantomWalletName}
          >
            <img
              src={new PhantomWalletAdapter().icon}
              alt="phantom wallet"
              className="mr-2 w-6 h-6"
            />
            Sign in with Phantom
          </ActionButton>
          <ActionButton
            onClick={(event) => handleWalletClick(SolflareWalletName)}
            className=" text-white font-bold"
            isDisabled={ongoingOperation}
            isLoading={ongoingOperation && wallet?.adapter?.name === SolflareWalletName}
          >
            <img
              src={new SolflareWalletAdapter().icon}
              alt="solflare wallet"
              className="mr-2 w-6 h-6"
            />
            Sign in with Solflare
          </ActionButton>
          <ActionButton
            onClick={(event) => handleWalletClick(SlopeWalletName)}
            className=" text-white font-bold"
            isDisabled={ongoingOperation}
            isLoading={ongoingOperation && wallet?.adapter?.name === SlopeWalletName}
          >
            <img
              src={new SlopeWalletAdapter().icon}
              alt="solflare wallet"
              className="mr-3 w-6 h-6"
            />
            Sign in with Slope
          </ActionButton>
        </div>
      </div>
    </Modal>
  )
}
