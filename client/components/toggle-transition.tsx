import { PropsWithChildren } from 'react'
import { Transition } from '@headlessui/react'

export function ToggleFade({ show, children }: PropsWithChildren<{ show?: boolean }>) {
    return (
        <Transition
            show={show}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100 rotate-0"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 "
        >
            {children}
        </Transition>
    )
}
