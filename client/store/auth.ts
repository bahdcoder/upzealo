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

export interface Author {
  id: string
  bio: string

  user: UserProfile
}

export interface Section {
  id: string
  title: string
  slug: string
  index: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  slug: string
  index: number
}

export interface Course {
  id: string
  title: string
  slug: string
  coverImage: string
  author: Author
  sections: Section[]
}

export interface CompletedLesson {
  id: string
  lessonId: string
  userId: string
}

export interface Badge {
  id: string
  title: string
  description: string
  className: string
  icon: string
  tags: Tag[]
  courses: Course[]
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

export enum PostType {
  BOUNTY = 'BOUNTY',
  DEFAULT = 'DEFAULT',
}

export interface Attachment {
  id: string
  url: string
}

export interface Bounty {
  id: string
  amount: number
  currencyMint: string
  addressId: string
  signature: string
  bountyAddress: string
  winnerId: string
  commentId: string
  winner: UserProfile
}

export interface Community {
  id: string
  coverImage: string
  name: string
  description: string
  logoImage: string
  badges: Badge[]
  rules: string
  owner: UserProfile
}

export interface Post {
  id: string
  content: string
  createdAt: string
  userId: string
  user: UserProfile
  type: PostType
  meta: {
    comments_count: number
  }
  bounty: Bounty
  attachments: Attachment[]
}

export interface Comment {
  id: string
  content: string
  user: UserProfile
  userId: string
  createdAt: string
}

export interface StreamPost {
  actor: string
  foreign_id: string
  id: string
  object: string
  origin: null
  target: string
  time: string
  verb: string
}

export interface EnrichedPost {
  post: Post
  stream: StreamPost
}

export interface UserProfile {
  id: string
  avatarUrl: string
  resumeUrl?: string
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
  bio: string
  solanaAddress: string
}

export interface AuthState {
  accessToken: string
  streamAccessToken: string
  userId: string
  authenticated: boolean
  loggedOut: boolean
}

export interface AuthContextData {
  authState: AuthState
  profile: UserProfile
  setAuthState: (authState: AuthState) => void
  setProfile: Dispatch<SetStateAction<UserProfile>>
}

export const defaultProfile: UserProfile = {
  id: '',
  addresses: [],
  username: '',
  avatarUrl: '',
  bio: '',
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
    loggedOut: false,
  },
  setAuthState() {},
  profile: defaultProfile,
  setProfile() {},
})

export const useAuth = () => useContext(AuthCtx)
