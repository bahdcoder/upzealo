import classNames from 'classnames'
import { Dispatch, Fragment, PropsWithChildren, SetStateAction, SVGProps } from 'react'
import { Transition, Dialog } from '@headlessui/react'

export function CloseIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={16} cy={16} r={16} fill="currentColor" />
      <g clipPath="url(#clip0_45_16633)">
        <path
          d="M16.7667 16.0597C16.7589 16.0519 16.7528 16.0427 16.7486 16.0326C16.7444 16.0225 16.7422 16.0116 16.7422 16.0007C16.7422 15.9897 16.7444 15.9789 16.7486 15.9687C16.7528 15.9586 16.7589 15.9494 16.7667 15.9417L19.8544 12.8543C19.9481 12.7604 20.0007 12.6332 20.0007 12.5005C20.0006 12.3678 19.9478 12.2406 19.8539 12.1468C19.76 12.0531 19.6327 12.0005 19.5 12.0006C19.3673 12.0007 19.2401 12.0534 19.1464 12.1473L16.059 15.2333C16.0513 15.2411 16.0421 15.2473 16.032 15.2515C16.0219 15.2557 16.011 15.2578 16 15.2578C15.9891 15.2578 15.9782 15.2557 15.9681 15.2515C15.958 15.2473 15.9488 15.2411 15.941 15.2333L12.8537 12.1473C12.8073 12.1009 12.7522 12.064 12.6915 12.0389C12.6308 12.0138 12.5658 12.0008 12.5002 12.0008C12.3675 12.0008 12.2403 12.0534 12.1465 12.1472C12.0527 12.2409 12 12.3681 12 12.5007C12 12.6333 12.0526 12.7605 12.1464 12.8543L15.2334 15.9417C15.2411 15.9494 15.2473 15.9586 15.2515 15.9687C15.2557 15.9789 15.2579 15.9897 15.2579 16.0007C15.2579 16.0116 15.2557 16.0225 15.2515 16.0326C15.2473 16.0427 15.2411 16.0519 15.2334 16.0597L12.1464 19.1473C12.1 19.1938 12.0631 19.2489 12.038 19.3096C12.0129 19.3703 12 19.4353 12 19.501C12 19.6336 12.0527 19.7607 12.1465 19.8545C12.193 19.9009 12.2481 19.9377 12.3088 19.9629C12.3695 19.988 12.4345 20.0009 12.5002 20.0009C12.6328 20.0008 12.76 19.9481 12.8537 19.8543L15.941 16.7667C15.9488 16.7589 15.958 16.7528 15.9681 16.7485C15.9782 16.7443 15.9891 16.7422 16 16.7422C16.011 16.7422 16.0219 16.7443 16.032 16.7485C16.0421 16.7528 16.0513 16.7589 16.059 16.7667L19.1464 19.8543C19.2401 19.9481 19.3673 20.0008 19.4999 20.0009C19.6325 20.0009 19.7597 19.9483 19.8535 19.8545C19.9473 19.7607 20.0001 19.6336 20.0001 19.501C20.0001 19.3683 19.9475 19.2411 19.8537 19.1473L16.7667 16.0597Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_45_16633">
          <rect width={8} height={8} fill="white" transform="translate(12 12)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Modal({
  isOpen,
  setIsOpen,
  children,
  title,
  hideHeading,
  positionClasses,
  size = 'xlarge',
}: PropsWithChildren<{
  isOpen?: boolean
  title?: string
  setIsOpen?: (open: boolean) => void
  hideHeading?: boolean
  positionClasses?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
}>) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={() => setIsOpen?.(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#131212]/90" />
        </Transition.Child>

        <div
          className={classNames(
            positionClasses ? positionClasses : 'fixed inset-0 overflow-y-auto'
          )}
        >
          <div className="flex min-h-full items-center justify-center lg:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  'w-full h-screen lg:h-auto transform overflow-hidden lg:rounded-3xl bg-black p-6 text-left align-middle shadow-xl transition-all relative',
                  {
                    'max-w-xl': size === 'xlarge',
                    'max-w-sm': size === 'small',
                    'max-w-md': size === 'medium',
                    'max-w-lg': size === 'large',
                  }
                )}
              >
                {hideHeading ? null : (
                  <div className="flex items-center justify-between pb-6 border-b border-dark-700">
                    <Dialog.Title as="h3" className="text-xl font-bold leading-6">
                      {title}
                    </Dialog.Title>

                    <button
                      onClick={() => setIsOpen?.(false)}
                      className="focus:outline-none hover:opacity-70 transition ease-linear"
                    >
                      <CloseIcon className="text-[#202125]" />
                    </button>
                  </div>
                )}

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
