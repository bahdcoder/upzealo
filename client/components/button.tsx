import classNames from 'classnames'
import { PropsWithChildren, MouseEventHandler } from 'react'

export function ActionButton({
  children,
  className,
  onClick,
}: PropsWithChildren<{ className?: string; onClick?: MouseEventHandler<HTMLButtonElement> }>) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'group rounded-full flex items-center justify-center py-4 px-5 border border-dark-400 bg-transparent hover:bg-dark-700 transition ease-linear hover:border-transparent focus:outline-none',
        className
      )}
    >
      {children}
    </button>
  )
}

export function PrimaryButton({
  children,
  className,
  onClick,
}: PropsWithChildren<{ className?: string; onClick?: MouseEventHandler<HTMLButtonElement> }>) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'group rounded-full flex items-center justify-center py-4 border-none text-black bg-primary-500 hover:bg-primary-700 transition ease-linear focus:outline-none font-bold',
        className
      )}
    >
      {children}
    </button>
  )
}

export default function Button({
  children,
  className,
  ...rest
}: PropsWithChildren<{ onClick?: MouseEventHandler; className?: string }>) {
  return (
    <button
      className={classNames(
        'rounded-full px-4 py-3 cursor-pointer bg-dark-700 font-medium transition ease-linear flex items-center justify-center',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
