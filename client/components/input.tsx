import cx from 'classnames'
import { PropsWithChildren, HTMLProps } from 'react'

export default function Input({ className, label, ...rest }: PropsWithChildren<HTMLProps<HTMLInputElement> & {
    label?: string
}>) {
    return (
        <div className='flex flex-col w-full'>
            {label ? <label className='text-sm text-white font-bold mb-3'>{label}</label> : null}
            <input type="text" className={cx('text-sm w-full h-12 rounded-lg bg-dark-700 placeholder:text-dark-300 p-4 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-white', className)} {...rest} />
        </div>
    )
}
