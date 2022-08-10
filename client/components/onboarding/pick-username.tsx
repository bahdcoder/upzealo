import Input from '../input'
import { PrimaryButton } from '../button'
import { useContext, useState } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'
import { useMutation } from '@tanstack/react-query'
import { useApiAxiosInstance } from '../../helpers/axios-client'
import { AuthCtx } from '../../store/auth'

export function PickUsername({}: {}) {
  const instance = useApiAxiosInstance()
  const { setProfile } = useContext(AuthCtx)
  const [username, setUsername] = useState('')
  const { step, setStep, setOnboardingSteps } = useContext(OnboardingCtx)

  const { isLoading: isUpdatingUsername, mutate } = useMutation(
    async () => {
      await instance.put(`/profiles/username/update`, {
        username,
      })

      setProfile((profile) => ({ ...profile, username }))
    },
    {
      onSuccess() {
        setStep(OnboardingStep.PICK_WEB3_JOURNEY)
        setOnboardingSteps((currentSteps) =>
          currentSteps.map((step) => {
            if (step.idx === OnboardingStep.PICK_USERNAME) {
              return { ...step, completed: true }
            }

            return step
          })
        )
      },
    }
  )

  function onNext() {
    mutate()
  }

  console.log({ username })

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
          <Input
            error="Please provide a valid username"
            placeholder="s00lSorcerer"
            onChange={(event: any) => setUsername(event.target.value)}
          />
        </div>

        <PrimaryButton isLoading={isUpdatingUsername} className="w-full" onClick={() => onNext()}>
          Next
        </PrimaryButton>
      </div>
    </div>
  )
}
