import Input from '../input'
import { PrimaryButton } from '../button'
import { useContext } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'
import ReactTextareaAutosize from 'react-textarea-autosize'

export function UserBio() {
    const { step, setStep } = useContext(OnboardingCtx)

    function onNext() {
        setStep(OnboardingStep.FOLLOW_RECOMMENDATIONS)
    }

    return (
        <div className="flex flex-col mt-6 mb-6">
            <h2 className="font-bold text-lg text-center text-primary-500">Tell us who you are</h2>

            <p className="mt-4 text-center text-sm">
                Introduce yourself. Tell us what you're working on, and what makes you excited in the Web3 Space
            </p>

            <div className="mt-6">
                <ReactTextareaAutosize className="rounded-lg text-sm p-4 border border-dark-400 bg-transparent min-h-[6rem] text-white focus:outline-none w-full text-md resize-none placeholder:text-dark-300 focus:ring-1 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div className="mt-6">
                <PrimaryButton className="w-full" onClick={() => onNext()}>
                    Next
                </PrimaryButton>
            </div>
        </div>
    )
}
