import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useApiAxiosInstance } from '../helpers/axios-client'
import { UserProfile, useAuth } from '../store/auth'
import AvatarProfile from './avatar-profile'
import { ActionButton, FollowButton } from './button'
import { useOnboardingCtx } from './onboarding/onboarding-ctx'

export function WhoToFollow() {
  const instance = useApiAxiosInstance()
  const queryClient = useQueryClient()
  const { isUserOnboarding } = useOnboardingCtx()

  const { authState } = useAuth()

  const { data: profiles = [] } = useQuery<UserProfile[]>(
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
  )
}
