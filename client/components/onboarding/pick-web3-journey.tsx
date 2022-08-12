import Input from '../input'
import classNames from 'classnames'
import { PrimaryButton, Spinner } from '../button'
import { useContext, useState } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useApiAxiosInstance } from '../../helpers/axios-client'
import { Badge } from '../../store/auth'

export function PickWeb3Journey() {
  const instance = useApiAxiosInstance()
  const [search, setSearch] = useState('')
  const { setStep, setBadges, badges, selectedBadges, setSelectedBadges, setOnboardingSteps } =
    useContext(OnboardingCtx)

  const { isLoading } = useQuery(
    ['badges'],
    async () => {
      const response = await instance.get(`/profiles/badges`)

      setBadges(response.data)
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  const { mutate: updateBadges, isLoading: isUpdatingBadges } = useMutation(
    async () => {
      await instance.post(`/profiles/badges`, {
        badges: selectedBadges.map((badge) => badge.id),
      })
    },
    {
      onSuccess() {
        setStep(OnboardingStep.PICK_WEB3_EXPERIENCE)

        setOnboardingSteps((currentSteps) =>
          currentSteps.map((step) => {
            if (step.idx === OnboardingStep.PICK_WEB3_JOURNEY) {
              return { ...step, completed: true }
            }

            return step
          })
        )
      },
    }
  )

  function onNext() {
    updateBadges()
  }

  function onSelect(badge: Badge, isSelected: boolean) {
    if (isSelected) {
      setSelectedBadges(selectedBadges.filter((selectedBadge) => selectedBadge.id !== badge.id))
    } else {
      setSelectedBadges([...selectedBadges, badge])
    }
  }

  let displayedBadges = badges

  if (search) {
    displayedBadges = badges.filter(
      (badge) =>
        badge.title.toLowerCase().match(search.toLowerCase()) ||
        badge.description.toLowerCase().match(search.toLowerCase())
    )
  }

  return (
    <div className="flex flex-col mt-6 mb-6">
      <h2 className="font-bold text-lg text-center text-primary-500">Pick your Web3 Journey</h2>

      <p className="mt-4 text-center text-sm">
        Your Web3 journey represents your personal and professional experience in Web3. Upzealo
        would present you with opportunities and communities that match your journeys.
      </p>

      {isLoading ? null : (
        <div className="my-6">
          <Input
            placeholder="Search for journeys"
            value={search}
            onChange={(event: any) => setSearch(event.target.value)}
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center mt-4">
          <Spinner />
        </div>
      ) : null}

      {!isLoading ? (
        <div className="grid grid-cols-2 gap-5 max-h-[24rem] overflow-y-auto">
          {displayedBadges.map((badge) => {
            const isSelected = selectedBadges.some((selectedBadge) => selectedBadge.id === badge.id)

            return (
              <button
                key={badge.id}
                onClick={() => onSelect(badge, isSelected)}
                className={classNames(
                  'border-2 rounded-lg relative flex flex-col bg-dark-700 hover:bg-dark-400 transition ease-linear border-transparent p-4',
                  `badge-${badge.className}`
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <h5
                    className={classNames(
                      'text-xs font-semibold text-left',
                      `badge-${badge.className}-heading`
                    )}
                  >
                    {badge.title}
                  </h5>

                  {isSelected ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 0 24 24"
                      width="16px"
                      fill="currentColor"
                      className={classNames(`badge-${badge.className}-svg`)}
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  ) : null}
                </div>

                <p className="text-xs mt-2 text-left">{badge.description}</p>
              </button>
            )
          })}
        </div>
      ) : null}

      {!isLoading && displayedBadges.length === 0 ? (
        <p className="flex justify-center items-center text-xs">No journeys matched your search.</p>
      ) : null}

      <div className="mt-8">
        <PrimaryButton
          className="w-full"
          onClick={() => onNext()}
          isDisabled={selectedBadges.length === 0}
          isLoading={isUpdatingBadges}
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  )
}
