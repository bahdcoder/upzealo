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
import {
  UserProfile,
  AuthState,
  AuthCtx,
  OnboardingStep,
  defaultProfile as authDefaultProfile,
} from './auth'

export function AuthContextWrapper({
  children,
  isAuthenticated,
}: PropsWithChildren<{ isAuthenticated: boolean }>) {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new SlopeWalletAdapter()],
    []
  )

  return (
    <ConnectionProvider endpoint={config.solanaRpcUrl}>
      <WalletProvider wallets={wallets} autoConnect={isAuthenticated}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
}

export function AuthContextProvider({
  children,
  defaultAuthState = {
    accessToken: '',
    streamAccessToken: '',
    userId: '',
    authenticated: false,
    loggedOut: false,
  },
  defaultProfile = authDefaultProfile,
}: PropsWithChildren<{ defaultAuthState?: AuthState; defaultProfile?: UserProfile }>) {
  const [userOnboarding, setUserOnboarding] = useState(false)
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([])
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState)
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)

  return (
    <AuthCtx.Provider value={{ authState, profile, setProfile, setAuthState }}>
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
