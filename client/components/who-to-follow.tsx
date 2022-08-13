import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiAxiosInstance } from "../helpers/axios-client";
import { UserProfile } from "../store/auth";
import AvatarProfile from "./avatar-profile";
import { ActionButton, FollowButton } from "./button";

export function WhoToFollow() {
    const instance = useApiAxiosInstance()
    const queryClient = useQueryClient()

    const { data: profiles = [] } = useQuery<UserProfile[]>(['who-to-follow'], async () => {
        const response = await instance.get('/profiles/follows/suggestions?perPage=6')

        return response.data.users
    })

    return (
        <div className="mt-6 space-y-6">
            {profiles.map((profile) => (
                <div className="flex items-center justify-between" key={profile.id}>
                    <AvatarProfile size='small' profile={profile} />

                    <FollowButton
                        size='small'
                        profile={profile}
                        onChange={(action) => {
                            queryClient.setQueryData<UserProfile[]>(['who-to-follow'], (profiles = []) =>
                                profiles.map((oldProfile) =>
                                    oldProfile.id === profile.id
                                        ? {
                                            ...oldProfile,
                                            meta: {
                                                ...oldProfile.meta,
                                                isFollowing: action === 'followed'
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
