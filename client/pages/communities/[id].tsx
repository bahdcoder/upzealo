import { ToggleFade } from '../../components/toggle-transition'
import classNames from 'classnames'
import Head from 'next/head'
import { PropsWithChildren, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { withGetServerSideProps } from '../../helpers/session'
import { getApiInstance } from '../../helpers/axios-client'
import { Community as CommunityInterface } from '../../store/auth'
import Link from 'next/link'

export default function Community({
  communities,
  community,
}: PropsWithChildren<{ communities: CommunityInterface[]; community: CommunityInterface }>) {
  const [leftSideOpen, setLeftSideOpen] = useState(false)

  return (
    <div className="w-full h-screen">
      <Head>
        <title>{community.name} - Upzealo</title>
      </Head>

      <div className="flex h-full pt-20">
        <div
          onMouseEnter={() => setLeftSideOpen(true)}
          onMouseLeave={() => setLeftSideOpen(false)}
          className={classNames(
            'hidden pl-8 pt-4 h-[95%] lg:flex flex-col transition-width duration-400 ease overflow-y-auto',
            {
              'w-24': leftSideOpen === false,
              'w-[15rem]': leftSideOpen,
            }
          )}
        >
          <div className="grid grid-cols-1 gap-y-6">
            {communities.map((community) => (
              <Link key={community.id} href={`/communities/${community.id}`}>
                <a>
                  <button className="flex items-center cursor-pointer group">
                    <img
                      className=" w-10 h-10 rounded-full"
                      src={community.logoImage}
                      alt="community logos"
                    />

                    <ToggleFade show={leftSideOpen}>
                      <p className="ml-3 font-semibold text-sm group-hover:text-primary-500 transition ease-linear">
                        {community.name}
                      </p>
                    </ToggleFade>
                  </button>
                </a>
              </Link>
            ))}
          </div>
        </div>

        <div className="ml-10 bg-black hidden lg:flex lg:w-[14rem] pt-10">
          <div className="h-[95%] w-full border border-dark-700 rounded-3xl p-6">
            <img className="mb-6 w-14 h-14" src={community.logoImage} alt="" />

            <h3 className="font-bold">{community.name}</h3>

            <div className="mt-1 text-xs text-dark-300 flex items-center">
              <div className="w-[6px] h-[6px] rounded-full bg-primary-500 mr-2"></div>{' '}
              {community.meta.memberships_count} Members
            </div>

            <div className="mt-8">
              <span className="text-xs text-dark-300 uppercase">CHANNELS</span>

              <div className="mt-4 flex flex-col w-full">
                <button className="text-primary-500 font-semibold -ml-6 border-l border-primary-500 pl-6 h-8 flex items-center cursor-pointer">
                  <span className="mr-1">#</span> marketplace
                </button>
                <button className="text-white mt-2 font-semibold -ml-6 pl-6 h-8 flex items-center cursor-pointer">
                  <span className="mr-1">#</span> floor-check
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-6 lg:ml-8 w-full lg:w-auto flex-grow pt-10 h-[88%] lg:h-[95%] mr-6 lg:mr-12">
          <div className="rounded-3xl bg-dark-700 h-full w-full relative">
            <div className="px-4 lg:px-8 py-4 lg:py-6 text-white font-bold border-b border-white/10 w-full">
              #marketplace
            </div>

            <div className="flex-grow overflow-y-auto h-[74%] mb-32"></div>

            <div className="absolute w-full px-6 lg:px-10 bottom-0 pb-6 lg:pb-10">
              <div className="bg-black rounded-lg flex">
                <ReactTextareaAutosize
                  className="px-6 py-6 text-xs bg-transparent focus:outline-none placeholder-dark-400 w-full resize-none"
                  placeholder="Type a message"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

  try {
    const [response, communityResponse] = await Promise.all([
      instance.get(`/communities/self`),
      instance.get(`/communities/${params?.id}`),
    ])

    return {
      props: {
        communities: response.data.data,
        community: communityResponse.data.community,
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        statusCode: 301,
      },
    }
  }
})
