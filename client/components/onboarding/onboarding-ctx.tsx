import { createContext, Dispatch, SetStateAction } from 'react'

import { OnboardingStep as OnboardingStepInterface, Badge } from '../../store/auth'

export enum OnboardingStep {
  PICK_USERNAME = 1,
  PICK_WEB3_JOURNEY = 2,
  PICK_WEB3_EXPERIENCE = 3,
  USER_BIO = 4,
  FOLLOW_RECOMMENDATIONS = 5,
}

export interface OnboardingCtx {
  step: OnboardingStep
  setStep: Dispatch<SetStateAction<OnboardingStep>>

  selectedBadges: Badge[]
  setSelectedBadges: Dispatch<SetStateAction<Badge[]>>

  onboardingSteps: OnboardingStepInterface[]
  setOnboardingSteps: Dispatch<SetStateAction<OnboardingStepInterface[]>>

  isUserOnboarding: boolean
  setIsUserOnboarding: Dispatch<SetStateAction<boolean>>

  badges: Badge[]
  setBadges: Dispatch<SetStateAction<Badge[]>>
}

export const OnboardingCtx = createContext<OnboardingCtx>({
  step: OnboardingStep.PICK_USERNAME,
  badges: [],
  selectedBadges: [],
  onboardingSteps: [],
  setBadges() {},
  setSelectedBadges() {},
  setOnboardingSteps() {},
  setStep: () => {},
  isUserOnboarding: true,
  setIsUserOnboarding: () => {},
})
