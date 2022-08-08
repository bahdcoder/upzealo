import cx from 'classnames'
import { PropsWithChildren } from 'react'

type Size = 'default' | 'small'

export default function Avatar({
  url,
  name,
  size = 'default',
}: PropsWithChildren<{ url: string; name?: string; size?: Size }>) {
  return (
    <img
      src={url}
      alt={`${name}'s avatar`}
      className={cx('rounded-full', {
        'w-12 h-12': size === 'default',
        'w-[2.25rem] h-[2.25rem]': size === 'small',
      })}
    />
  )
}
