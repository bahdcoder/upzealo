import { PropsWithChildren, useState, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SlopeWalletAdapter,
} from '@solana/wallet-adapter-wallets'

import { config } from '../helpers/config'
import { ConnectWallet } from '../components/connect-wallet'
import { RootOnboarding } from '../components/onboarding/root'
import { UserProfile, AuthState, AuthCtx, OnboardingStep } from './auth'

export function AuthContextWrapper({ children }: PropsWithChildren<{}>) {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new SlopeWalletAdapter()],
    []
  )

  return (
    <ConnectionProvider endpoint={config.solanaRpcUrl}>
      <WalletProvider wallets={wallets}>{children}</WalletProvider>
    </ConnectionProvider>
  )
}

export function AuthContextProvider({ children }: PropsWithChildren<{}>) {
  const [userOnboarding, setUserOnboarding] = useState(false)
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([])
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: '',
    streamAccessToken: '',
    userId: '',
    authenticated: false,
  })
  const [profile, setProfile] = useState<UserProfile>({
    id: '',
    addresses: [],
    username: '',
    avatarUrl: '',
    badges: [],
    experiences: [],
    solanaAddress: null,
    onboardingSteps: {
      steps: [],
      completedOnboarding: true,
    },
    followedBy: false,
    follows: false
  })

  return (
    <AuthCtx.Provider value={{ authState, profile, setProfile }}>
      <RootOnboarding
        isUserOnboarding={userOnboarding}
        setIsUserOnboarding={setUserOnboarding}
        onboardingSteps={onboardingSteps}
        setOnboardingSteps={setOnboardingSteps}
      />
      <ConnectWallet
        authState={authState}
        setAuthState={setAuthState}
        userOnboarding={userOnboarding}
        setUserOnboarding={setUserOnboarding}
        setOnboardingSteps={setOnboardingSteps}
        onAuthenticated={(user) => setProfile(user)}
      />
      {children}
    </AuthCtx.Provider>
  )
}
