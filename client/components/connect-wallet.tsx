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
  loggedOut: boolean
}

export function Logo() {
  return (
    <svg
      width={154}
      height={49}
      viewBox="0 0 154 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_154_65685)">
        <path
          d="M0.151117 36.2738L21.0953 24.1035L21.0199 0.0975037L0.078125 12.1865L0.151117 36.2738Z"
          fill="url(#paint0_linear_154_65685)"
        />
        <path
          d="M41.929 12.2353L21.0195 0.10025L21.0949 24.1035L41.9871 36.3204L41.929 12.2353Z"
          fill="url(#paint1_linear_154_65685)"
        />
        <path
          d="M21.0453 48.4361L41.9871 36.3204L21.0979 24.1021L0.149414 36.2738L21.0453 48.4361Z"
          fill="url(#paint2_linear_154_65685)"
        />
        <g style={{ mixBlendMode: 'multiply' }}>
          <path
            d="M13.9733 44.3065L0.150619 36.2735L0.106445 20.3499L21.0319 8.27063L34.8545 16.3044L34.8999 32.2276L13.9733 44.3065Z"
            fill="url(#paint3_linear_154_65685)"
          />
        </g>
      </g>
      <path
        d="M65.2303 27.592V16.456H68.3023V27.4C68.3023 28.664 68.6383 29.632 69.3103 30.304C69.9823 30.976 70.9343 31.312 72.1663 31.312C73.4143 31.312 74.3743 30.976 75.0463 30.304C75.7183 29.616 76.0543 28.648 76.0543 27.4V16.456H79.1263V27.592C79.1263 28.952 78.8383 30.136 78.2623 31.144C77.7023 32.136 76.9023 32.912 75.8623 33.472C74.8223 34.016 73.5903 34.288 72.1663 34.288C70.7583 34.288 69.5343 34.016 68.4943 33.472C67.4543 32.928 66.6463 32.152 66.0703 31.144C65.5103 30.136 65.2303 28.952 65.2303 27.592ZM82.4729 39.496V22.144H85.1849L85.3769 23.944C85.7289 23.256 86.2729 22.728 87.0089 22.36C87.7449 21.976 88.5529 21.784 89.4329 21.784C90.5689 21.784 91.5449 22.04 92.3609 22.552C93.1929 23.064 93.8409 23.776 94.3049 24.688C94.7689 25.6 95.0009 26.68 95.0009 27.928C95.0009 29.16 94.7849 30.256 94.3529 31.216C93.9209 32.176 93.2889 32.936 92.4569 33.496C91.6409 34.04 90.6409 34.312 89.4569 34.312C88.5769 34.312 87.7689 34.144 87.0329 33.808C86.3129 33.472 85.7689 33.008 85.4009 32.416V39.496H82.4729ZM85.4249 28.072C85.4249 28.776 85.5609 29.4 85.8329 29.944C86.1049 30.488 86.4889 30.92 86.9849 31.24C87.4969 31.544 88.0889 31.696 88.7609 31.696C89.4489 31.696 90.0409 31.544 90.5369 31.24C91.0329 30.92 91.4089 30.488 91.6649 29.944C91.9209 29.4 92.0489 28.776 92.0489 28.072C92.0489 27.368 91.9209 26.744 91.6649 26.2C91.4089 25.656 91.0329 25.232 90.5369 24.928C90.0409 24.608 89.4489 24.448 88.7609 24.448C88.0889 24.448 87.4969 24.6 86.9849 24.904C86.4889 25.208 86.1049 25.632 85.8329 26.176C85.5609 26.72 85.4249 27.352 85.4249 28.072ZM106.12 34H96.5677V31.6L102.472 24.592H96.5677V22.144H106.12V24.568L100.144 31.552H106.12V34ZM113.699 34.312C112.531 34.312 111.491 34.048 110.579 33.52C109.683 32.976 108.979 32.24 108.467 31.312C107.955 30.368 107.699 29.288 107.699 28.072C107.699 26.84 107.947 25.752 108.443 24.808C108.939 23.864 109.635 23.128 110.531 22.6C111.427 22.056 112.451 21.784 113.603 21.784C114.803 21.784 115.835 22.04 116.699 22.552C117.563 23.048 118.227 23.744 118.691 24.64C119.171 25.536 119.411 26.608 119.411 27.856V28.744L109.235 28.768L109.283 26.896H116.507C116.507 26.08 116.243 25.424 115.715 24.928C115.203 24.432 114.507 24.184 113.627 24.184C112.939 24.184 112.355 24.328 111.875 24.616C111.411 24.904 111.059 25.336 110.819 25.912C110.579 26.488 110.459 27.192 110.459 28.024C110.459 29.304 110.731 30.272 111.275 30.928C111.835 31.584 112.659 31.912 113.747 31.912C114.547 31.912 115.203 31.76 115.715 31.456C116.243 31.152 116.587 30.72 116.747 30.16H119.459C119.203 31.456 118.563 32.472 117.539 33.208C116.531 33.944 115.251 34.312 113.699 34.312ZM125.165 34.312C123.917 34.312 122.925 33.976 122.189 33.304C121.469 32.616 121.109 31.72 121.109 30.616C121.109 29.528 121.485 28.664 122.237 28.024C123.005 27.368 124.093 26.984 125.501 26.872L129.053 26.584V26.32C129.053 25.776 128.949 25.344 128.741 25.024C128.549 24.688 128.269 24.448 127.901 24.304C127.533 24.144 127.101 24.064 126.605 24.064C125.741 24.064 125.077 24.24 124.613 24.592C124.149 24.928 123.917 25.408 123.917 26.032H121.421C121.421 25.168 121.637 24.424 122.069 23.8C122.517 23.16 123.141 22.664 123.941 22.312C124.757 21.96 125.693 21.784 126.749 21.784C127.821 21.784 128.741 21.976 129.509 22.36C130.277 22.728 130.869 23.288 131.285 24.04C131.701 24.776 131.909 25.696 131.909 26.8V34H129.341L129.125 32.248C128.869 32.856 128.373 33.352 127.637 33.736C126.917 34.12 126.093 34.312 125.165 34.312ZM126.101 32.104C127.013 32.104 127.733 31.848 128.261 31.336C128.805 30.824 129.077 30.112 129.077 29.2V28.576L126.605 28.768C125.693 28.848 125.045 29.04 124.661 29.344C124.277 29.632 124.085 30.016 124.085 30.496C124.085 31.024 124.261 31.424 124.613 31.696C124.965 31.968 125.461 32.104 126.101 32.104ZM137.737 34H134.833V16.144H137.737V34ZM140.113 28.048C140.113 26.816 140.385 25.736 140.929 24.808C141.473 23.864 142.225 23.128 143.185 22.6C144.145 22.072 145.233 21.808 146.449 21.808C147.681 21.808 148.769 22.072 149.713 22.6C150.673 23.128 151.425 23.864 151.969 24.808C152.513 25.736 152.785 26.816 152.785 28.048C152.785 29.28 152.513 30.368 151.969 31.312C151.425 32.24 150.673 32.968 149.713 33.496C148.769 34.024 147.681 34.288 146.449 34.288C145.233 34.288 144.145 34.024 143.185 33.496C142.225 32.968 141.473 32.24 140.929 31.312C140.385 30.368 140.113 29.28 140.113 28.048ZM143.041 28.048C143.041 28.768 143.185 29.4 143.473 29.944C143.777 30.488 144.177 30.912 144.673 31.216C145.185 31.52 145.777 31.672 146.449 31.672C147.121 31.672 147.713 31.52 148.225 31.216C148.737 30.912 149.137 30.488 149.425 29.944C149.713 29.4 149.857 28.768 149.857 28.048C149.857 27.312 149.713 26.68 149.425 26.152C149.137 25.608 148.737 25.184 148.225 24.88C147.713 24.576 147.121 24.424 146.449 24.424C145.777 24.424 145.185 24.576 144.673 24.88C144.177 25.184 143.777 25.608 143.473 26.152C143.185 26.68 143.041 27.312 143.041 28.048Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_154_65685"
          x1="33.0437"
          y1="12.2223"
          x2="-1.19114"
          y2="21.2497"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AEAEAE" />
          <stop offset="0.2" stopColor="#D1D1D1" />
          <stop offset="0.36" stopColor="#C8C8C8" />
          <stop offset="0.5" stopColor="#9F9F9F" />
          <stop offset="0.63" stopColor="#838383" />
          <stop offset="0.76" stopColor="#696969" />
          <stop offset="0.88" stopColor="#3C3C3C" />
          <stop offset="0.99" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_154_65685"
          x1="31.5519"
          y1="0.135455"
          x2="31.5519"
          y2="36.2218"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D0FA3D" />
          <stop offset="0.1" stopColor="#B5B5B5" />
          <stop offset="0.26" stopColor="#A7A7A7" />
          <stop offset="0.47" stopColor="#5C5C5C" />
          <stop offset="0.71" stopColor="#303030" />
          <stop offset="0.99" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_154_65685"
          x1="13.1381"
          y1="47.8046"
          x2="30.541"
          y2="22.6394"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D0FA3D" />
          <stop offset="0.31" stopColor="#232323" />
          <stop offset={1} stopColor="#D0FA3D" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_154_65685"
          x1="17.5032"
          y1="8.27063"
          x2="17.5032"
          y2="44.3065"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={1} stopColor="#D0FA3D" />
        </linearGradient>
        <clipPath id="clip0_154_65685">
          <rect width="42.0759" height="48.4988" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
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

  useEffect(
    () => {
      if (
        connected &&
        wallet &&
        publicKey &&
        !isSigningMessage &&
        !failedSigningMessage &&
        !authState.authenticated &&
        !authState.loggedOut
      ) {
        signWalletMessage()
      }
    },
    // eslint-disable-next-line
    [
      connected,
      connecting,
      wallet,
      publicKey,
      authState,
      isSigningMessage,
      failedSigningMessage,
      walletManuallySelected,
    ]
  )

  useEffect(() => {
    if (wallet && walletManuallySelected && !connected && !connecting) {
      connect()
    }

    // eslint-disable-next-line
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
        <h2 className="font-bold text-xl mb-6 text-center justify-center flex">
          <Logo />
        </h2>
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
