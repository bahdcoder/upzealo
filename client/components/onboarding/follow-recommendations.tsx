import Input from '../input'
import { FollowButton, PrimaryButton, Spinner } from '../button'
import { useContext } from 'react'
import { OnboardingCtx } from './onboarding-ctx'
import AvatarProfile from '../avatar-profile'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { UserProfile } from '../../store/auth'
import { useApiAxiosInstance } from '../../helpers/axios-client'

export function FollowRecommendations() {
  const instance = useApiAxiosInstance()
  const queryClient = useQueryClient()
  const { step, setStep, setIsUserOnboarding } = useContext(OnboardingCtx)

  const { isLoading: isFetchingRecommendations, data: profiles = [] } = useQuery<UserProfile[]>(
    ['follows'],
    async () => {
      const response = await instance.get('/profiles/follows/suggestions')

      return response.data.users
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  console.log({ profiles })

  function onFinish() {
    setIsUserOnboarding(false)
  }

  return (
    <div className="flex flex-col mt-6 mb-6">
      <h2 className="font-bold text-lg text-center text-primary-500">Build your network</h2>

      <p className="mt-4 text-center text-sm">
        Here's some people with similar interests we recommend you follow. You'll see posts from the
        people you follow on your feed.
      </p>

      {isFetchingRecommendations ? (
        <div className="flex items-center justify-center mt-6">
          <Spinner />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-y-6 max-h-[24rem] overflow-y-auto">
          {profiles.map((profile) => (
            <div className="flex items-center justify-between" key={profile.id}>
              <AvatarProfile size="small" profile={profile} />

              <FollowButton
                profile={profile}
                onChange={(action) => {
                  queryClient.setQueryData<UserProfile[]>(['follows'], (profiles = []) =>
                    profiles.map((oldProfile) =>
                      oldProfile.id === profile.id
                        ? {
                          ...oldProfile,
                          meta: {
                            ...oldProfile.meta,
                            isFollowing: action === 'followed'
                          }
                        }
                        : oldProfile
                    )
                  )
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <PrimaryButton className="w-full" onClick={() => onFinish()}>
          Finish
        </PrimaryButton>
      </div>
    </div>
  )
}
