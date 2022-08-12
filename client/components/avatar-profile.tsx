import cx from 'classnames'
import { PropsWithChildren } from 'react'
import Link from 'next/link'

import Avatar from './avatar'
import { UserProfile } from '../store/auth'

type Size = 'default' | 'small'

export default function AvatarProfile({
  size = 'default',
  profile
}: PropsWithChildren<{
  size?: Size
  profile: UserProfile
}>) {
  // subtitle is either current working position or user's username
  const subtitle = profile?.experiences?.length > 0 ? 'Works at Aurory' : profile.username
  const username = profile?.experiences?.length > 0 ? profile.username : null

  return (
    <Link href="/">
      <a className="flex items-center">
        <div className="mr-4">
          <Avatar
            size={size}
            url={profile?.avatarUrl}
          />
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

          {subtitle ? <span className="text-dark-300 text-xs">{subtitle}</span> : null}
        </div>
      </a>
    </Link>
  )
}
