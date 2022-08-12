import Input from '../input'
import { PrimaryButton } from '../button'
import { useContext, useState } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { useMutation } from '@tanstack/react-query'
import { useApiAxiosInstance } from '../../helpers/axios-client'
import { AuthCtx } from '../../store/auth'

export function UserBio() {
  const { step, setStep, setOnboardingSteps } = useContext(OnboardingCtx)
  const [bio, setBio] = useState('')
  const { setProfile } = useContext(AuthCtx)
  const instance = useApiAxiosInstance()

  const { isLoading: isUpdatingBio, mutate: updateBio } = useMutation(
    async () => {
      await instance.put('/profiles/bio/update', {
        bio,
      })

      setProfile((profile) => ({ ...profile, bio }))
    },
    {
      onSuccess() {
        setStep(OnboardingStep.FOLLOW_RECOMMENDATIONS)

        setOnboardingSteps((currentSteps) =>
          currentSteps.map((step) => {
            if (step.idx === OnboardingStep.USER_BIO) {
              return { ...step, completed: true }
            }

            return step
          })
        )
      },
    }
  )

  function onNext() {
    updateBio()
  }

  return (
    <div className="flex flex-col mt-6 mb-6">
      <h2 className="font-bold text-lg text-center text-primary-500">Tell us who you are</h2>

      <p className="mt-4 text-center text-sm">
        Introduce yourself. Tell us what you're working on, and what makes you excited in the Web3
        Space
      </p>

      <div className="mt-6">
        <ReactTextareaAutosize
          onChange={(event) => setBio(event.target.value)}
          className="rounded-lg text-sm p-4 border border-dark-400 bg-transparent min-h-[6rem] text-white focus:outline-none w-full text-md resize-none placeholder:text-dark-300 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div className="mt-6">
        <PrimaryButton
          className="w-full"
          onClick={() => onNext()}
          isLoading={isUpdatingBio}
          isDisabled={!bio || bio.length < 24}
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  )
}
