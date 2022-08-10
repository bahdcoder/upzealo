import Input from '../input'
import { PrimaryButton } from '../button'
import { useContext } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'

export function PickWeb3Journey() {
    const { step, setStep } = useContext(OnboardingCtx)

    function onNext() {
        setStep(OnboardingStep.PICK_WEB3_EXPERIENCE)
    }

    return (
        <div className="flex flex-col mt-6 mb-6">
            <h2 className="font-bold text-lg text-center text-primary-500">Pick your Web3 Journey</h2>

            <p className="mt-4 text-center text-sm">
                Your Web3 journey represents your personal and professional experience in Web3. Upzealo would present you with opportunities and communities that match your journeys.
            </p>

            <div className="my-6">
                <Input placeholder="Search for journeys" />
            </div>

            <div className="grid grid-cols-2 gap-5 max-h-[24rem] overflow-y-auto">
                {[1, 2, 3, 4, 5, 6].map(x => (
                    <button key={x} className="h-32 rounded-lg flex flex-col bg-dark-700 hover:bg-dark-400 transition ease-linear border-2 border-transparent hover:border-primary-500 p-4">
                        <h5 className="text-primary-500 text-sm">
                            Builder/Founder
                        </h5>

                        <p className='text-xs mt-2 text-left'>You like to build things from scratch. You've launched or are working on an NFT/Web3 Startup. </p>
                    </button>
                ))}
            </div>

            <div className="mt-8">


                <PrimaryButton className="w-full" onClick={() => onNext()}>
                    Next
                </PrimaryButton>
            </div>
        </div>
    )
}
