import cx from 'classnames'
import { PropsWithChildren, useMemo } from 'react'
import Link from 'next/link'

import Avatar from './avatar'
import { UserProfile } from '../store/auth'

type Size = 'default' | 'small'

export default function AvatarProfile({
  size = 'default',
  profile,
}: PropsWithChildren<{
  size?: Size
  profile: UserProfile
}>) {
  // subtitle is either current working position or user's username

  const subtitle = useMemo(() => {
    if (profile.username.length > 10) {
      return `@${profile.username}`
    }

    if (profile?.experiences?.length > 0) {
      const latestExperience = profile.experiences.sort((exA, exB) => {
        const startedA = new Date(exA.startedAt)
        const startedB = new Date(exB.startedAt)

        return startedA.getTime() > startedB.getTime() ? 1 : -1
      })[0]

      return latestExperience
        ? `${latestExperience?.title}, ${latestExperience?.organisation?.name}`
        : undefined
    }

    return `@${profile.username}`
  }, [profile])

  const username = profile?.experiences?.length > 0 ? profile.username.length > 10 ? null : profile.username : null

  return (
    <Link href="/">
      <a className="flex items-center">
        <div className="mr-4">
          <Avatar size={size} url={profile?.avatarUrl} name={profile.username} />
        </div>

        <div className="flex flex-col justify-center">
          <p
            className={cx('text-white font-bold', {
              'text-sm': size === 'default',
              'text-xs': size === 'small',
            })}
          >
            {profile.username}
            {username ? <span className="ml-1 text-dark-300">@{username}</span> : null}
          </p>

          {subtitle ? (
            <span className="text-dark-300 text-xs text-ellipsis whitespace-nowrap w-[200px] overflow-hidden">
              {subtitle}
            </span>
          ) : null}
        </div>
      </a>
    </Link>
  )
}
