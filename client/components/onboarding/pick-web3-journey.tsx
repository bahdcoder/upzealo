import Input from '../input'
import { PrimaryButton, Spinner } from '../button'
import { useContext } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'
import { useQuery } from '@tanstack/react-query'
import { useApiAxiosInstance } from '../../helpers/axios-client'

export function PickWeb3Journey() {
  const instance = useApiAxiosInstance()
  const { setStep, setBadges, badges } = useContext(OnboardingCtx)

  const { isLoading } = useQuery(['badges'], async () => {
    const response = await instance.get(`/profiles/badges`)

    setBadges(response.data)
  }, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })

  function onNext() {
    setStep(OnboardingStep.PICK_WEB3_EXPERIENCE)
  }

  return (
    <div className="flex flex-col mt-6 mb-6">
      <h2 className="font-bold text-lg text-center text-primary-500">Pick your Web3 Journey</h2>

      <p className="mt-4 text-center text-sm">
        Your Web3 journey represents your personal and professional experience in Web3. Upzealo
        would present you with opportunities and communities that match your journeys.
      </p>

      {isLoading ? null : <div className="my-6">
        <Input placeholder="Search for journeys" />
      </div>}

      {isLoading ? <div className="flex items-center justify-center mt-4">
        <Spinner />
      </div> : null}

      {!isLoading ? (
        <div className="grid grid-cols-2 gap-5 max-h-[24rem] overflow-y-auto">
          {badges.map(badge => (
            <button
              key={badge.id}
              className="rounded-lg flex flex-col bg-dark-700 hover:bg-dark-400 transition ease-linear border-2 border-transparent hover:border-primary-500 p-4"
            >
              <h5 className="text-primary-500 text-sm">
                {badge.title}
              </h5>

              <p className="text-xs mt-2 text-left">
                {badge.description}
              </p>
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-8">
        <PrimaryButton className="w-full" onClick={() => onNext()}>
          Next
        </PrimaryButton>
      </div>
    </div>
  )
}
