import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { CloseIcon, Modal } from '../modal'
import Input from '../input'
import { PrimaryButton } from '../button'
import { PickUsername } from './pick-username'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'
import { PickWeb3Journey } from './pick-web3-track'
import { PickWeb3Experience } from './pick-web3-experience'
import { UserBio } from './user-bio'
import { FollowRecommendations } from './follow-recommendations'

export function RootOnboarding({
    isUserOnboarding,
    setIsUserOnboarding,
}: PropsWithChildren<{
    isUserOnboarding: boolean
    setIsUserOnboarding: Dispatch<SetStateAction<boolean>>
}>) {
    const [step, setStep] = useState(OnboardingStep.PICK_USERNAME)

    return (
        <OnboardingCtx.Provider value={{ step, setStep, isUserOnboarding, setIsUserOnboarding }}>
            <Modal
                hideHeading
                size="medium"
                isOpen={isUserOnboarding}
                setIsOpen={() => { }}
                positionClasses="fixed inset-x-0 overflow-y-auto top-0 lg:mt-24"
            >
                <div className="px-4">
                    <div className="flex items-center justify-between pb-6 border-b border-dark-700">
                        <Dialog.Title as="h3" className="text-sm text-center uppercase w-full font-semibold">
                            step {step} of {Object.keys(OnboardingStep).length / 2}
                        </Dialog.Title>
                    </div>

                    <Transition
                        show={step === OnboardingStep.PICK_USERNAME}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <PickUsername />
                    </Transition>

                    <Transition
                        show={step === OnboardingStep.PICK_WEB3_JOURNEY}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <PickWeb3Journey />
                    </Transition>

                    <Transition
                        show={step === OnboardingStep.PICK_WEB3_EXPERIENCE}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <PickWeb3Experience />
                    </Transition>

                    <Transition
                        show={step === OnboardingStep.USER_BIO}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <UserBio />
                    </Transition>

                    <Transition
                        show={step === OnboardingStep.FOLLOW_RECOMMENDATIONS}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <FollowRecommendations />
                    </Transition>
                </div>
            </Modal>
        </OnboardingCtx.Provider>
    )
}
