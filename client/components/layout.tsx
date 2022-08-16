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
  const communitiesActive = router.pathname.match(/communities/)

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
    <>
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
            <div className="flex items-center justify-center h-full space-x-12">
              <Link href="/">
                <a className="flex h-full w-[9.375rem] items-center justify-center relative group">
                  <svg xmlns="http://www.w3.org/2000/svg" height={40} viewBox="0 0 24 24" width={40} className={classNames('group-hover:text-primary-500', {
                    'text-primary-500': homeActive,
                    'text-dark-300': !homeActive,
                  })} fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>


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
              <Link href="/communities">
                <a className="flex h-full w-[9.375rem] items-center justify-center relative group transition ease-linear">
                  <svg width={36}
                    height={36} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" fill="currentColor"
                    className={classNames('group-hover:text-primary-500 transition ease-linear', {
                      'text-primary-500': communitiesActive,
                      'text-dark-300': !communitiesActive,
                    })} viewBox="0 0 24 24" ><rect fill="none" height={24} width={24} /><g><path d="M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14 c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2 c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14 c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M16.24,13.65c-1.17-0.52-2.61-0.9-4.24-0.9 c-1.63,0-3.07,0.39-4.24,0.9C6.68,14.13,6,15.21,6,16.39V18h12v-1.61C18,15.21,17.32,14.13,16.24,13.65z M8.07,16 c0.09-0.23,0.13-0.39,0.91-0.69c0.97-0.38,1.99-0.56,3.02-0.56s2.05,0.18,3.02,0.56c0.77,0.3,0.81,0.46,0.91,0.69H8.07z M12,8 c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,8,12,8 M12,6c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3s3-1.34,3-3 C15,7.34,13.66,6,12,6L12,6z" /></g></svg>

                  <div
                    className={classNames(
                      'absolute w-full h-1 bottom-0 hover group-hover:bg-primary-500 transition ease-linear',
                      {
                        'bg-primary-500': communitiesActive,
                        ' bg-transparent': !communitiesActive,
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

      <div className="fixed h-20 w-full bg-black bottom-0 z-[500] px-12 flex items-center justify-between lg:hidden">
        <Link href='/'>
          <a>

            <svg xmlns="http://www.w3.org/2000/svg" height={40} viewBox="0 0 24 24" width={40} className={classNames('group-hover:text-primary-500', {
              'text-primary-500': homeActive,
              'text-dark-300': !homeActive,
            })} fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>

          </a>
        </Link>

        <Link href="/communities">
          <a className="flex h-full items-center justify-center relative group transition ease-linear">
            <svg width={56}
              height={56} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" fill="currentColor"
              className={classNames('group-hover:text-primary-500 transition ease-linear', {
                'text-primary-500': communitiesActive,
                'text-dark-300': !communitiesActive,
              })} viewBox="0 0 24 24" ><rect fill="none" height={24} width={24} /><g><path d="M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14 c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2 c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14 c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M16.24,13.65c-1.17-0.52-2.61-0.9-4.24-0.9 c-1.63,0-3.07,0.39-4.24,0.9C6.68,14.13,6,15.21,6,16.39V18h12v-1.61C18,15.21,17.32,14.13,16.24,13.65z M8.07,16 c0.09-0.23,0.13-0.39,0.91-0.69c0.97-0.38,1.99-0.56,3.02-0.56s2.05,0.18,3.02,0.56c0.77,0.3,0.81,0.46,0.91,0.69H8.07z M12,8 c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,8,12,8 M12,6c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3s3-1.34,3-3 C15,7.34,13.66,6,12,6L12,6z" /></g></svg>

          </a>
        </Link>

        <Link href="/learning">
          <a className="flex h-full items-center justify-center relative group transition ease-linear">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
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
          </a>
        </Link>
      </div>
    </>
  )
}
