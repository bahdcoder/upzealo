import { ActionButton, FollowButton, PrimaryButton } from '../components/button'
import { Fragment, PropsWithChildren, useEffect } from 'react'
import { withGetServerSideProps } from '../helpers/session'
import { getApiInstance, useApiAxiosInstance } from '../helpers/axios-client'
import { EnrichedPost, useAuth, UserProfile } from '../store/auth'
import { Tag } from '../components/onboarding/pick-web3-experience'
import Post, { PostLoader } from '../components/post'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function Profile({
  currentProfile: profile,
}: PropsWithChildren<{ currentProfile: UserProfile }>) {
  const { authState } = useAuth()
  const instance = useApiAxiosInstance()
  const {
    isLoading: isLoadingFeed,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery<{ posts: EnrichedPost[]; page: number; perPage: number }>(
    ['profile-feed', profile.username, authState.authenticated],
    async ({ pageParam = 1 }) => {
      if (!authState.authenticated) {
        return {
          page: 1,
          perPage: 10,
          posts: [],
        }
      }

      const response = await instance.get(`/feed/${profile.username}?page=${pageParam}perPage=10`)

      return response.data
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.posts.length === 0) {
          return undefined
        }

        return lastPage.page + 1
      },
    }
  )
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  const latestExperience = profile.experiences.sort((exA, exB) => {
    const startedA = new Date(exA.startedAt)
    const startedB = new Date(exB.startedAt)

    return startedA.getTime() > startedB.getTime() ? 1 : -1
  })[0]

  const { profile: authUserProfile } = useAuth()

  const tags = profile.badges.reduce(
    (tags, badge) => [...tags, ...badge.tags.map((t) => ({ ...t, badge }))],
    [] as any[]
  )

  return (
    <>
      <div className="w-full bg-indigo-800 h-96"></div>
      <div className="p-4 lg:p-0">
        <div className="w-full max-w-3xl mx-auto -mt-56 lg:-mt-32 bg-[#131212] rounded-2xl px-6 py-6 lg:px-12 lg:py-12 lg:pb-64">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <img src={profile.avatarUrl} alt="avatar" className="rounded-full w-32 h-32" />

              <div className="mt-3">
                <h1 className="font-bold flex items-center text-2xl font-grotesk">
                  {profile.username}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 text-primary-500 fill-current"
                    enableBackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="current"
                  >
                    <g>
                      <rect fill="none" height={24} width={24} />
                    </g>
                    <g>
                      <g>
                        <path d="M23,11.99l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,11.99l2.44,2.79 l-0.34,3.7l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,11.99z M19.05,13.47l-0.56,0.65l0.08,0.85 l0.18,1.95l-1.9,0.43l-0.84,0.19l-0.44,0.74l-0.99,1.68l-1.78-0.77L12,18.85l-0.79,0.34l-1.78,0.77l-0.99-1.67l-0.44-0.74 l-0.84-0.19l-1.9-0.43l0.18-1.96l0.08-0.85l-0.56-0.65l-1.29-1.47l1.29-1.48l0.56-0.65L5.43,9.01L5.25,7.07l1.9-0.43l0.84-0.19 l0.44-0.74l0.99-1.68l1.78,0.77L12,5.14l0.79-0.34l1.78-0.77l0.99,1.68l0.44,0.74l0.84,0.19l1.9,0.43l-0.18,1.95l-0.08,0.85 l0.56,0.65l1.29,1.47L19.05,13.47z" />
                        <polygon points="10.09,13.75 7.77,11.42 6.29,12.91 10.09,16.72 17.43,9.36 15.95,7.87" />
                      </g>
                    </g>
                  </svg>
                </h1>

                <div className="mt-2 flex flex-col lg:flex-row lg:items-center text-gray-400">
                  <span className="font-grotesk">@{profile.username}</span>
                  {latestExperience ? (
                    <span>{`${latestExperience?.title}, ${latestExperience?.organisation?.name}`}</span>
                  ) : null}
                  <span className="text-sm mt-2 lg:mt-0 lg:ml-3 font-grotesk">
                    {profile.meta.followersCount} followers
                  </span>
                  <span className="text-sm mt-2 lg:mt-0 lg:ml-3 font-grotesk">
                    {profile.meta.followingCount} following
                  </span>
                </div>
                <p className="mt-2 text-gray-400 text-sm">{profile.bio}</p>

                {profile.resumeUrl ? (
                  <div className="mt-5 mb-4">
                    <a href={profile.resumeUrl} target="_blank" referrerPolicy="no-referrer">
                      <PrimaryButton className="px-8 py-3 text-xs">
                        View my Soul Resume
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 ml-3"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                        </svg>
                      </PrimaryButton>
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            <FollowButton
              isDisabled={authUserProfile.id === profile.id}
              profile={profile}
            ></FollowButton>
          </div>

          <div className="mt-4 flex flex-wrap">
            {tags.map((tag) => (
              <Tag className={tag.badge.className} icon={tag.badge.icon} title={tag.title} />
            ))}
          </div>

          <div className="flex flex-col space-y-6 mb-24 mt-6">
            {isLoadingFeed ? (
              <>
                <PostLoader key="1" />
                <PostLoader key={'2'} />
                <PostLoader key={'3'} />
              </>
            ) : null}

            {!isLoadingFeed ? (
              <>
                {data?.pages.map((page, idx) => (
                  <Fragment key={idx}>
                    {page.posts.map((item) => (
                      <Post key={item.post.id} post={item.post} refresh={refetch} />
                    ))}
                  </Fragment>
                ))}

                <div className="flex items-center justify-center">
                  <button
                    ref={ref}
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                  >
                    {isFetchingNextPage ? (
                      <></>
                    ) : hasNextPage ? (
                      'Load Newer'
                    ) : (
                      'Nothing more to load'
                    )}
                  </button>
                  {isFetchingNextPage ? (
                    <div className="flex w-full flex-col">
                      <PostLoader />
                      <PostLoader />
                      <PostLoader />
                      <PostLoader />
                    </div>
                  ) : null}
                </div>
                <div>
                  {isFetching && !isFetchingNextPage ? (
                    <>
                      <PostLoader />
                      <PostLoader />
                      <PostLoader />
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withGetServerSideProps(async function ({ req, params }) {
  const accessToken = req.session?.user?.accessToken
  const instance = getApiInstance(accessToken)

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        statusCode: 301,
      },
    }
  }

  const [profileResponse] = await Promise.all([instance.get(`/profiles/${params?.username}`)])

  return {
    props: {
      currentProfile: profileResponse.data.profile,
    },
  }
})
