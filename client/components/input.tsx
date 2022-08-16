import cx from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import { PropsWithChildren, HTMLProps, ChangeEventHandler } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Input({
  className,
  label,
  error,
  textarea,
  ...rest
}: PropsWithChildren<
  HTMLProps<HTMLInputElement> & {
    label?: string
    error?: string
    textarea?: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
  }
>) {
  let Component: any = 'input'

  if (textarea) {
    Component = TextareaAutosize
  }

  return (
    <div className="flex flex-col w-full">
      {label ? <label className="text-sm text-white font-bold mb-3">{label}</label> : null}
      <Component
        type="text"
        className={cx(
          'text-sm w-full h-12 rounded-lg bg-dark-700 placeholder:text-dark-300 p-4 focus:outline-none text-white resize-none',
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
