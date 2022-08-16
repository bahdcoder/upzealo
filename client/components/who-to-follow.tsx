import { useQuery, useQueryClient } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import { useApiAxiosInstance } from '../helpers/axios-client'
import { UserProfile, useAuth } from '../store/auth'
import AvatarProfile from './avatar-profile'
import { ActionButton, FollowButton } from './button'
import { useOnboardingCtx } from './onboarding/onboarding-ctx'

export function WhoToFollowLoader() {
  const defaultProps = {
    count: 1,
    duration: 1,
    highlightColor: '#717E84',
    baseColor: '#1F2024',
  }

  return (
    <>
      {[1, 2, 3, 4, 5].map((x) => (
        <div className="flex mb-3" key={x}>
          <Skeleton {...defaultProps} circle borderRadius={9999} count={1} height={40} width={40} />
          <div className="flex flex-col ml-3 pt-2">
            <Skeleton {...defaultProps} height={10} width={200} />
            <div>
              <Skeleton {...defaultProps} height={6} width={100} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export function WhoToFollow() {
  const instance = useApiAxiosInstance()
  const queryClient = useQueryClient()
  const { isUserOnboarding } = useOnboardingCtx()

  const { authState } = useAuth()

  const { data: profiles = [], isLoading } = useQuery<UserProfile[]>(
    ['who-to-follow', authState.authenticated, isUserOnboarding],
    async () => {
      if (!authState.authenticated) {
        return []
      }

      const response = await instance.get('/profiles/follows/suggestions?perPage=6')

      return response.data.users
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  return (
    <>
      {isLoading ? <WhoToFollowLoader /> : null}
      <div className="mt-6 space-y-6">
        {profiles.map((profile) => (
          <div className="flex items-center justify-between" key={profile.id}>
            <AvatarProfile size="small" profile={profile} />

            <FollowButton
              size="small"
              profile={profile}
              onChange={(action) => {
                queryClient.setQueryData<UserProfile[]>(
                  ['who-to-follow', authState.authenticated, isUserOnboarding],
                  (profiles = []) =>
                    profiles.map((oldProfile) =>
                      oldProfile.id === profile.id
                        ? {
                            ...oldProfile,
                            meta: {
                              ...oldProfile.meta,
                              isFollowing: action === 'followed',
                            },
                          }
                        : oldProfile
                    )
                )
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}
