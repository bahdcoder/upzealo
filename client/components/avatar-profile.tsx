import cx from 'classnames'
import { PropsWithChildren } from 'react'
import Link from 'next/link'

import Avatar from './avatar'

type Size = 'default' | 'small'

export default function AvatarProfile({
  size = 'default',
  hideUsername,
  subTitle,
  hideSubtitle = size !== 'default'
}: PropsWithChildren<{ size?: Size; hideUsername?: boolean; subTitle?: string, hideSubtitle?: boolean }>) {
  return (
    <Link href="/">
      <a className="flex items-center">
        <div className="mr-4">
          <Avatar
            size={size}
            url="https://pbs.twimg.com/profile_images/1537681214546616320/xC9xGPn3_400x400.jpg"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p
            className={cx('text-white font-bold', {
              'text-sm': size === 'default',
              'text-xs': size === 'small',
            })}
          >
            sOOl Sorcerer{' '}
            {hideUsername ? null : <span className="ml-1 text-dark-300">@s00lSorcerer</span>}
          </p>

          {hideSubtitle ? null : <span className="text-dark-300 text-xs">{subTitle}</span>}
        </div>
      </a>
    </Link>
  )
}
