import Input from '../input'
import { PrimaryButton } from '../button'
import { useContext } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'

export function PickUsername() {
    const { step, setStep } = useContext(OnboardingCtx)

    function onNext() {
        setStep(OnboardingStep.PICK_WEB3_JOURNEY)
    }

    return (
        <div className="flex flex-col mt-6 mb-6">
            <h2 className="font-bold text-lg text-center text-primary-500">Welcome to Upzealo</h2>

            <p className="mt-4 text-center text-sm">
                Welcome to the professional network for Web3 Talent. Upzealo is designed to help you meet,
                collaborate and discover unique Web3 & Metaverse opportunities.
            </p>

            <div className="w-full flex justify-center items-center mt-6">
                <img
                    className="w-[2.25rem] h-[2.25rem] rounded-full mr-3"
                    src="https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://arweave.net/2vZjKnPTa8ia7tNdMMsBkYg4T6KL0X78qkKBoj5HjSo?ext=png"
                    alt="cets on crecks"
                />
                <img
                    className="w-[4.125rem] h-[4.125rem] rounded-full"
                    src="https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://metadata.degods.com/g/8957-dead.png"
                    alt="dead god"
                />
                <img
                    className="w-[2.25rem] h-[2.25rem] rounded-full ml-3"
                    src="https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeibr4h4xaqbdjhgn4x2t5qamd4pqxaihwkcqyaikuxvwilju2d6pp4.ipfs.dweb.link/196.png?ext=png"
                    alt="okay bears"
                />
            </div>

            <div className="mt-8">
                <h4 className="font-semibold text-lg text-center">Choose your username</h4>

                <div className="my-6">
                    <Input placeholder="s00lSorcerer" />
                </div>

                <PrimaryButton className="w-full" onClick={() => onNext()}>
                    Next
                </PrimaryButton>
            </div>
        </div>
    )
}
