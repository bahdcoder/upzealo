import { Dispatch, SetStateAction, createContext, useContext } from 'react'

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

export interface Organisation {
  id: string
  name: string
  imageUrl: string
}

export interface Experience {
  startedAt: string
  endedAt: string | null
  title: string
  id: string
  organisation: Organisation
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
  meta: {
    followersCount: number
    followingCount: number
    isFollowedBy: boolean
    isFollowing: boolean
  }
  username: string
  solanaAddress: string
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

export const defaultProfile: UserProfile = {
  id: '',
  addresses: [],
  username: '',
  avatarUrl: '',
  badges: [],
  experiences: [],
  solanaAddress: '',
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
}

export const AuthCtx = createContext<AuthContextData>({
  authState: {
    accessToken: '',
    streamAccessToken: '',
    userId: '',
    authenticated: false,
  },
  profile: defaultProfile,
  setProfile() {},
})

export const useAuth = () => useContext(AuthCtx)
