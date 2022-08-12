import { Dispatch, SetStateAction, createContext } from 'react'

export interface Address {
  isDefault: boolean
  publicKey: string
}

export interface Tag {
  id: string
  title: string
  className: string
  icon: string
  description: string | null
}

export interface Badge {
  id: string
  title: string
  description: string
  className: string
  icon: string
  tags: Tag[]
}

export interface OnboardingStep {
  idx: number
  title: string
  completed: boolean
}

export interface Experience {
  isCurrent: boolean
}

export interface UserProfile {
  id: string
  avatarUrl: string
  addresses: Address[]
  badges: Badge[]
  experiences: Experience[]
  onboardingSteps: {
    completedOnboarding: boolean
    steps: OnboardingStep[]
  }
  username: string
  follows: boolean
  followedBy: boolean
  solanaAddress: string | null
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
    id: '',
    addresses: [],
    username: '',
    avatarUrl: '',
    badges: [],
    solanaAddress: null,
    onboardingSteps: {
      steps: [],
      completedOnboarding: true,
    },
    followedBy: false,
    follows: false,
  },
  setProfile() {},
})
