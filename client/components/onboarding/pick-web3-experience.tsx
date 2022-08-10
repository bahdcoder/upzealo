import Input from '../input'
import { PrimaryButton } from '../button'
import { useContext } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'

export function PickWeb3Experience() {
    const { step, setStep } = useContext(OnboardingCtx)

    function onNext() {
        setStep(OnboardingStep.USER_BIO)
    }

    return (
        <div className="flex flex-col mt-6 mb-6">
            <h2 className="font-bold text-lg text-center text-primary-500">Pick your Web3 Experience</h2>

            <p className="mt-4 text-center text-sm">
                What have you done so far in the Web3 Space? Select as many tags as you like. These will help others discover and collaborate with you. Think of them as tags for your profile.
            </p>

            <div className="flex flex-wrap max-h-[24rem] overflow-y-auto mt-6">
                {[1, 2].map(x => (
                    <button key={x} className="rounded-md flex items-center text-primary-500 bg-primary-500/10 border border-primary-500/50 transition ease-linear px-3 py-1.5 text-xs ml-2 mb-2 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" height={16} viewBox="0 0 24 24" width={16} fill="currentColor" className='mr-2'><path d="M0 0h24v24H0z" fill="none" /><path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67 0 1.38-1.12 2.5-2.5 2.5zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" /><circle cx="6.5" cy="11.5" r="1.5" /><circle cx="9.5" cy="7.5" r="1.5" /><circle cx="14.5" cy="7.5" r="1.5" /><circle cx="17.5" cy="11.5" r="1.5" /></svg>
                        Launched an NFT
                    </button>
                ))}
                {[1].map(x => (
                    <button key={x} className="rounded-md flex items-center text-red-500 bg-red-500/10 border border-red-500/50 transition ease-linear px-3 py-1.5 text-xs ml-2 mb-2 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" height={16} viewBox="0 0 24 24" width={16} fill="currentColor" className='mr-2'><path d="M0 0h24v24H0z" fill="none" /><path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67 0 1.38-1.12 2.5-2.5 2.5zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" /><circle cx="6.5" cy="11.5" r="1.5" /><circle cx="9.5" cy="7.5" r="1.5" /><circle cx="14.5" cy="7.5" r="1.5" /><circle cx="17.5" cy="11.5" r="1.5" /></svg>
                        Created a Website Graphic
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
