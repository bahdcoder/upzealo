import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, ReactNode } from 'react'
import { getApiInstance, useAxiosInstance } from '../helpers/axios-client'
import { useAuth } from '../store/auth'
import { Logo } from './connect-wallet'

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const instance = useAxiosInstance()
  const homeActive = router.pathname === '/' || router.pathname === '/[username]'
  const learningActive = router.pathname.match(/learning/) !== null

  const { profile, setAuthState } = useAuth()

  async function onLogout() {
    await instance.post('/api/auth/logout')

    setAuthState({
      authenticated: false,
      accessToken: '',
      streamAccessToken: '',
      userId: '',
      loggedOut: true,
    })
  }

  return (
    <div
      className={classNames('w-full', {
        'h-screen': homeActive,
      })}
    >
      <nav
        className={classNames('w-full h-20 px-8 flex items-center justify-between bg-black', {
          'fixed top-0 z-50': !homeActive || router.pathname === '/[username]',
        })}
      >
        <div className="lg:w-[22%]">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>

        <div className="w-[56%] hidden lg:block h-full px-24">
          <div className="flex items-center h-full space-x-12">
            <Link href="/">
              <a className="flex h-full w-[9.375rem] items-center justify-center relative group">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  className={classNames('group-hover:text-primary-500', {
                    'text-primary-500': homeActive,
                    'text-dark-300': !homeActive,
                  })}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 6.33328C15.9999 6.23141 15.9765 6.13091 15.9316 6.03949C15.8866 5.94808 15.8213 5.86818 15.7407 5.80594L8.40733 0.139276C8.29053 0.0488895 8.14702 -0.000152588 7.99933 -0.000152588C7.85164 -0.000152588 7.70814 0.0488895 7.59133 0.139276L0.258 5.80594C0.177602 5.86832 0.112551 5.94828 0.0678301 6.03968C0.0231096 6.13109 -9.30091e-05 6.23152 2.802e-07 6.33328V15.3333C2.802e-07 15.5101 0.0702382 15.6797 0.195262 15.8047C0.320287 15.9297 0.489856 15.9999 0.666667 15.9999H6C6.08841 15.9999 6.17319 15.9648 6.2357 15.9023C6.29821 15.8398 6.33333 15.755 6.33333 15.6666V12.6666C6.33333 12.2246 6.50893 11.8007 6.82149 11.4881C7.13405 11.1755 7.55797 10.9999 8 10.9999C8.44203 10.9999 8.86595 11.1755 9.17851 11.4881C9.49107 11.8007 9.66667 12.2246 9.66667 12.6666V15.6666C9.66667 15.755 9.70179 15.8398 9.7643 15.9023C9.82681 15.9648 9.91159 15.9999 10 15.9999H15.3333C15.5101 15.9999 15.6797 15.9297 15.8047 15.8047C15.9298 15.6797 16 15.5101 16 15.3333V6.33328Z"
                    fill="currentColor"
                  />
                </svg>

                <div
                  className={classNames(
                    'absolute w-full h-1 bottom-0 hover group-hover:bg-primary-500',
                    {
                      'bg-primary-500': homeActive,
                      ' bg-transparent': !homeActive,
                    }
                  )}
                ></div>
              </a>
            </Link>
            <Link href="/learning">
              <a className="flex h-full w-[9.375rem] items-center justify-center relative group transition ease-linear">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={classNames('group-hover:text-primary-500 transition ease-linear', {
                    'text-primary-500': learningActive,
                    'text-dark-300': !learningActive,
                  })}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
                </svg>

                <div
                  className={classNames(
                    'absolute w-full h-1 bottom-0 hover group-hover:bg-primary-500 transition ease-linear',
                    {
                      'bg-primary-500': learningActive,
                      ' bg-transparent': !learningActive,
                    }
                  )}
                ></div>
              </a>
            </Link>
          </div>
        </div>

        <div className="lg:w-[22%] flex justify-end">
          <Menu as="div" className="flex-shrink-0 relative ml-5">
            <div>
              <Menu.Button className=" rounded-full flex focus:outline-none items-center">
                <span className="text-sm mr-3 font-grotesk">@{profile.username}</span>
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-12 w-12 rounded-full"
                  src={profile.avatarUrl}
                  alt={profile.username}
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-2xl shadow-lg bg-black ring-1 border border-dark-700 ring-black ring-opacity-5 py-3 focus:outline-none">
                <Link href={`/${profile.username}`}>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={classNames(
                          active ? 'bg-dark-700' : '',
                          'block py-2 px-6 text-sm text-white cursor-pointer'
                        )}
                      >
                        My profile
                      </a>
                    )}
                  </Menu.Item>
                </Link>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onLogout}
                      className={classNames(
                        active ? 'bg-dark-700' : '',
                        'w-full text-left block py-2 px-6 text-sm text-white cursor-pointer'
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
      {children}
    </div>
  )
}
