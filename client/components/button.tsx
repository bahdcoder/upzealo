import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { PropsWithChildren, MouseEventHandler, useContext, useState, SVGProps } from 'react'
import { useApiAxiosInstance } from '../helpers/axios-client'
import { AuthCtx, UserProfile } from '../store/auth'

export function Spinner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="animate-spin"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 4.75V6.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1266 6.87347L16.0659 7.93413"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.25 12L17.75 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1266 17.1265L16.0659 16.0659"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.75V19.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.9342 16.0659L6.87354 17.1265"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 12L4.75 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.9342 7.93413L6.87354 6.87347"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface ButtonProps {
  className?: string
  isLoading?: boolean
  isDisabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>
}

export function FollowButton({
  profile: targetProfile,
  onChange,
  ...buttonProps
}: PropsWithChildren<
  ButtonProps & {
    profile: UserProfile
    onChange?: (action: 'followed' | 'unfollowed') => void
  }
>) {
  const instance = useApiAxiosInstance()
  const [hovered, setHovered] = useState(false)
  const { profile: userProfile } = useContext(AuthCtx)

  let content = targetProfile.isFollowedByAuthUser ? 'Following' : 'Follow'

  if (hovered && targetProfile.isFollowedByAuthUser) {
    content = 'Unfollow'
  }

  const { isLoading, mutate: followUnfollow } = useMutation(async () => {
    if (targetProfile.isFollowedByAuthUser) {
      await instance.delete(`/feed/follows/${targetProfile.id}`)

      onChange?.('unfollowed')
    } else {
      await instance.post(`/feed/follows/${targetProfile.id}`)

      onChange?.('followed')
    }
  })

  return (
    <ActionButton
      className={classNames('py-2 px-3 text-xs w-[92px] h-[50px]', {
        'hover:bg-red-500/10 hover:text-red-500 bg-dark-700 border-transparent':
          targetProfile.isFollowedByAuthUser,
      })}
      onMouseEnter={() => {
        setHovered(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
      }}
      {...buttonProps}
      isLoading={isLoading}
      onClick={() => followUnfollow()}
    >
      {content}
    </ActionButton>
  )
}

export function ActionButton({
  children,
  className,
  onClick,
  isLoading,
  isDisabled,
  onMouseEnter,
  onMouseLeave,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || isDisabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classNames(
        'group rounded-full flex items-center justify-center py-4 px-5 transition ease-linear hover:border-transparent focus:outline-none',
        className,
        {
          'bg-dark-700 cursor-not-allowed': isLoading || isDisabled,
          'border border-dark-400 hover:bg-dark-700': !isLoading && !isDisabled,
        }
      )}
    >
      {isLoading ? <Spinner width={16} height={16} /> : children}
    </button>
  )
}

export function PrimaryButton({
  children,
  className,
  onClick,
  isLoading,
  isDisabled,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={classNames(
        'group rounded-full flex items-center justify-center py-4 border-none text-black transition ease-linear focus:outline-none font-bold',
        className,
        {
          'bg-primary-700 cursor-not-allowed': isDisabled || isLoading,
          'bg-primary-500 hover:bg-primary-700': !isLoading && !isDisabled,
        }
      )}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default function Button({
  children,
  className,
  isLoading,
  isDisabled,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        'rounded-full px-4 py-3 cursor-pointer bg-dark-700 font-medium transition ease-linear flex items-center justify-center',
        className
        // {
        //   "": isDisabled || isLoading,
        //   "": !isLoading && !isDisabled
        // }
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
