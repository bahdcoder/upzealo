import type { NextPage } from 'next'
import Link from 'next/link'

import Post, { PostLoader } from '../components/post'
import CreatePost from '../components/create-post'
import { WhoToFollow } from '../components/who-to-follow'
import { ActionButton, PrimaryButton } from '../components/button'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useApiAxiosInstance } from '../helpers/axios-client'
import { EnrichedPost, useAuth } from '../store/auth'
import { Fragment, useEffect } from 'react'

const Home: NextPage = () => {
  const instance = useApiAxiosInstance()
  const { authState } = useAuth()
  const {
    isLoading: isLoadingFeed,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery<{ posts: EnrichedPost[]; page: number; perPage: number }>(
    ['feed', authState.authenticated],
    async ({ pageParam = 1 }) => {
      if (!authState.authenticated) {
        return {
          page: 1,
          perPage: 10,
          posts: [],
        }
      }

      const response = await instance.get(`/feed?page=${pageParam}perPage=10`)

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

  const noCommunities = false

  return (
    <div className="flex items-center h-[calc(100%-5rem)]">
      <div className="hidden lg:flex w-[24%] h-full flex-col px-8 pt-12">
        <div className="flex items-center">
          <div className="rounded-full w-[2.25rem] h-[2.25rem] flex items-center justify-center bg-dark-700">
            <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5_49635)">
                <path
                  d="M9.00003 7.25C8.54605 7.25009 8.09812 7.35408 7.69053 7.554C7.65923 7.56933 7.63148 7.59103 7.60906 7.61772C7.58664 7.6444 7.57005 7.67548 7.56035 7.70895C7.55065 7.74243 7.54806 7.77756 7.55274 7.8121C7.55742 7.84664 7.56927 7.87981 7.58753 7.9095C8.02062 8.61336 8.24995 9.42357 8.25003 10.25C8.25003 10.3163 8.27637 10.3799 8.32325 10.4248C8.37014 10.4737 8.43373 10.5 8.50003 10.5H11.75C11.8163 10.5 11.8799 10.4737 11.9248 10.4248C11.9737 10.3799 12 10.3163 12 10.25C12 9.45435 11.684 8.69129 11.1214 8.12868C10.5587 7.56607 9.79568 7.25 9.00003 7.25Z"
                  fill="white"
                />
                <path
                  d="M8.97198 7C10.0075 7 10.847 6.16053 10.847 5.125C10.847 4.08947 10.0075 3.25 8.97198 3.25C7.93645 3.25 7.09698 4.08947 7.09698 5.125C7.09698 6.16053 7.93645 7 8.97198 7Z"
                  fill="white"
                />
                <path
                  d="M3.75 6.25C5.06168 6.25 6.125 5.18668 6.125 3.875C6.125 2.56332 5.06168 1.5 3.75 1.5C2.43832 1.5 1.375 2.56332 1.375 3.875C1.375 5.18668 2.43832 6.25 3.75 6.25Z"
                  fill="white"
                />
                <path
                  d="M7.5 10.25C7.5 9.25544 7.10491 8.30161 6.40165 7.59835C5.69839 6.89509 4.74456 6.5 3.75 6.5C2.75544 6.5 1.80161 6.89509 1.09835 7.59835C0.395088 8.30161 0 9.25544 0 10.25C0 10.3163 0.0243392 10.3799 0.0732233 10.4248C0.120107 10.4737 0.183696 10.5 0.25 10.5H7.25C7.3163 10.5 7.37989 10.4737 7.42478 10.4248C7.47366 10.3799 7.5 10.3163 7.5 10.25Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_5_49635">
                  <rect width={12} height={12} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <p className="text-white font-bold text-lg ml-4">Communities</p>
        </div>

        {noCommunities ? null : (
          <>
            <div className="flex flex-col mt-6">
              <ul className="list-reset">
                <li className="flex items-center">
                  <Link href="/">
                    <a className="flex items-center">
                      <img
                        src="https://pbs.twimg.com/profile_images/1537681214546616320/xC9xGPn3_400x400.jpg"
                        alt="community image"
                        className="w-10 h-10 rounded-sm"
                      />
                      <div className="flex flex-col ml-4">
                        <p className="font-bold text-white text-sm">NFT Collectors</p>
                        <span className="text-xs text-dark-300">7.6k members</span>
                      </div>
                    </a>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 w-full">
                <ActionButton className="w-full">Show more</ActionButton>
              </div>
            </div>
          </>
        )}

        {noCommunities ? (
          <div className="mt-6">
            <div className="rounded-3xl w-full border border-[#FFC3C31C] flex flex-col items-center justify-center py-8 bg-[linear-gradient(79.71deg, #25DDD1 -0.81%, rgba(37, 221, 209, 0) 72.47%)]">
              <div className="w-full flex justify-center items-center">
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
              <h2 className="mt-4 font-bold text-white text-xl">Join a community</h2>

              <p className="text-center mt-4 px-8">
                Upzealo is way more fun when you join a community. Find one that suits your
                interests.
              </p>

              <div className="mt-8 w-full px-10 mb-2">
                <PrimaryButton className="w-full">Explore Communities</PrimaryButton>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="bg-dark-700 w-full lg:w-[52%] rounded-t-3xl h-full px-6 pt-6 border-b-8 border-black overflow-y-auto">
        <div className="mb-6">
          <CreatePost />
        </div>

        <div className="flex flex-col space-y-6 mb-24">
          {isLoadingFeed ? (
            <>
              <PostLoader />
              <PostLoader />
              <PostLoader />
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
                  {isFetchingNextPage ? <></> : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
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
      <div className="hidden lg:flex flex-col w-[24%] h-full px-8 pt-12">
        <h2 className="text-white text-xl font-bold">Who to follow</h2>

        <WhoToFollow />
      </div>
    </div>
  )
}

export default Home
