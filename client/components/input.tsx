import cx from 'classnames'
import { PropsWithChildren, HTMLProps, ChangeEventHandler } from 'react'

export default function Input({
  className,
  label,
  error,
  ...rest
}: PropsWithChildren<
  HTMLProps<HTMLInputElement> & {
    label?: string
    error?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
  }
>) {
  return (
    <div className="flex flex-col w-full">
      {label ? <label className="text-sm text-white font-bold mb-3">{label}</label> : null}
      <input
        type="text"
        className={cx(
          'text-sm w-full h-12 rounded-lg bg-dark-700 placeholder:text-dark-300 p-4 focus:outline-none text-white',
          {
            'focus:ring-1 focus:ring-primary-500 focus:border-primary-500': !error,
            'ring-1 ring-red-500': error !== undefined,
          },
          className
        )}
        {...rest}
      />

      {error ? <small className="text-xs text-red-500 mt-1">{error}</small> : null}
    </div>
  )
}
