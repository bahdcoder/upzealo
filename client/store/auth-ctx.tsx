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

export function AuthContextWrapper({ children, isAuthenticated }: PropsWithChildren<{ isAuthenticated: boolean }>) {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new SlopeWalletAdapter()],
    []
  )

  return (
    <ConnectionProvider endpoint={config.solanaRpcUrl}>
      <WalletProvider wallets={wallets} autoConnect={isAuthenticated}>{children}</WalletProvider>
    </ConnectionProvider>
  )
}

export function AuthContextProvider({ children, defaultAuthState = {
  accessToken: '',
  streamAccessToken: '',
  userId: '',
  authenticated: false,
} }: PropsWithChildren<{ defaultAuthState?: AuthState }>) {
  const [userOnboarding, setUserOnboarding] = useState(false)
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([])
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState)
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
    meta: {
      followersCount: 0,
      followingCount: 0,
      isFollowedBy: false,
      isFollowing: false,
    },
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
