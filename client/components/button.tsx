import classNames from 'classnames'
import { PropsWithChildren, MouseEventHandler } from 'react'

export function Spinner() {
  return (
    <svg
      className="animate-spin"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
}

export function FollowButton(props: PropsWithChildren<ButtonProps>) {
  return (
    <ActionButton className="py-2 px-3 bg-dark-400 text-xs" {...props}>
      Follow
    </ActionButton>
  )
}

export function ActionButton({
  children,
  className,
  onClick,
  isLoading,
  isDisabled,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || isDisabled}
      className={classNames(
        'group rounded-full flex items-center justify-center py-4 px-5 transition ease-linear hover:border-transparent focus:outline-none',
        className,
        {
          'bg-dark-700 cursor-not-allowed': isLoading || isDisabled,
          'bg-transparent border border-dark-400 hover:bg-dark-700': !isLoading && !isDisabled,
        }
      )}
    >
      {isLoading ? <Spinner /> : children}
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
