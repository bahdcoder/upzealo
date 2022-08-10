import { createContext, Dispatch, SetStateAction } from 'react'

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

    isUserOnboarding: boolean
    setIsUserOnboarding: Dispatch<SetStateAction<boolean>>
}

export const OnboardingCtx = createContext<OnboardingCtx>({
    step: OnboardingStep.PICK_USERNAME,
    setStep: () => { },
    isUserOnboarding: true,
    setIsUserOnboarding: () => { }
})
