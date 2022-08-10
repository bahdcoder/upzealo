import { Dispatch, SetStateAction, createContext } from 'react'

export interface Address {
  isDefault: boolean
  publicKey: string
}

export interface Tag {
  id: string
  title: string
  description: string | null
}

export interface Badge {
  id: string
  title: string
  description: string
  color: string
  icon: string
  tags: Tag[]
}

export interface OnboardingStep {
  idx: number
  title: string
  completed: boolean
}

export interface UserProfile {
  addresses: Address[]
  username: string
}

export interface AuthState {
  accessToken: string
  streamAccessToken: string
  userId: string
  authenticated: boolean
}

export interface AuthContextData {
  authState: AuthState
  profile: UserProfile
  setProfile: Dispatch<SetStateAction<UserProfile>>
}

export const AuthCtx = createContext<AuthContextData>({
  authState: {
    accessToken: '',
    streamAccessToken: '',
    userId: '',
    authenticated: false,
  },
  profile: {
    addresses: [],
    username: '',
  },
  setProfile() {},
})
