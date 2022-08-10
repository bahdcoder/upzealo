import { useWallet, ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { createContext, PropsWithChildren, useState, useMemo } from 'react'
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SlopeWalletAdapter,
} from '@solana/wallet-adapter-wallets'

import { config } from '../helpers/config'
import { ConnectWallet } from '../components/connect-wallet'
import { RootOnboarding } from '../components/onboarding/root'

export interface AuthState {
    accessToken: string
    streamAccessToken: string
    userId: string
    authenticated: boolean
}

export interface AuthContextData {
    authState: AuthState
}

export const AuthCtx = createContext<AuthContextData>({
    authState: {
        accessToken: '',
        streamAccessToken: '',
        userId: '',
        authenticated: false,
    },
})

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
    const { wallet } = useWallet()

    const [userOnboarding, setUserOnboarding] = useState(false)
    const [authState, setAuthState] = useState<AuthState>({
        accessToken: '',
        streamAccessToken: '',
        userId: '',
        authenticated: false,
    })

    return (
        <AuthCtx.Provider value={{ authState }}>
            <RootOnboarding isUserOnboarding={userOnboarding} setIsUserOnboarding={setUserOnboarding} />
            <ConnectWallet
                userOnboarding={userOnboarding}
                setUserOnboarding={setUserOnboarding}
                authState={authState}
                setAuthState={setAuthState}
            />
            {children}
        </AuthCtx.Provider>
    )
}
