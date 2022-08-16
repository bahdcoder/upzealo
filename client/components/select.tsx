import classNames from 'classnames'
import { Fragment, useState, PropsWithChildren, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, ArrowDownIcon } from '@heroicons/react/solid'
import { twMerge } from 'tailwind-merge'

export interface SelectOption {
  id: string
  name: string
  image?: string
}

export function Select({
  label,
  options = [],
  defaultOption,
  onChange,
  className,
}: PropsWithChildren<{
  label?: string
  defaultOption?: SelectOption
  options: SelectOption[]
  className?: string
  onChange?: (option: SelectOption) => void
}>) {
  const [selected, setSelected] = useState(defaultOption || options[0])

  useEffect(() => {
    onChange?.(selected)

    // eslint-disable-next-line
  }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {label ? (
            <Listbox.Label className="block text-sm font-medium text-white mb-1">
              {label}
            </Listbox.Label>
          ) : null}
          <div className="relative">
            <Listbox.Button
              className={twMerge(
                'relative w-full bg-dark-700 border border-transparent rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                className
              )}
            >
              <span className="flex items-center">
                {selected?.image ? (
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                ) : null}
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-dark-400 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-dark-700' : 'text-white',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {option.image ? (
                            <img
                              src={option.image}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {option.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary-500',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
