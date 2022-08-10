import Input from '../input'
import { FollowButton, PrimaryButton } from '../button'
import { useContext } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'
import AvatarProfile from '../avatar-profile'

export function FollowRecommendations() {
  const { step, setStep, setIsUserOnboarding } = useContext(OnboardingCtx)

  function onFinish() {
    setIsUserOnboarding(false)
  }

  return (
    <div className="flex flex-col mt-6 mb-6">
      <h2 className="font-bold text-lg text-center text-primary-500">People you may know</h2>

      <p className="mt-4 text-center text-sm">
        Here's some people with similar interests we recommend you follow. You'll see posts from the
        people you follow on your feed.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-y-6">
        <div className="flex items-center justify-between">
          <AvatarProfile
            size="small"
            subTitle="Senior Frontend Engineer, Aurory"
            hideSubtitle={false}
          />

          <FollowButton />
        </div>

        <div className="flex items-center justify-between">
          <AvatarProfile
            size="small"
            subTitle="Senior Frontend Engineer, Aurory"
            hideSubtitle={false}
          />

          <FollowButton />
        </div>
      </div>

      <div className="mt-8">
        <PrimaryButton className="w-full" onClick={() => onFinish()}>
          Finish
        </PrimaryButton>
      </div>
    </div>
  )
}
