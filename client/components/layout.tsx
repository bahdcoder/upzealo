import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const homeActive = router.pathname === '/'
  const learningActive = router.pathname.match(/learning/) !== null

  console.log({ homeActive, learningActive })

  return (
    <div
      className={classNames('w-full', {
        'h-screen': homeActive,
      })}
    >
      <nav
        className={classNames('w-full h-20 px-8 flex items-center bg-black', {
          'fixed top-0': !homeActive,
        })}
      >
        <div className="w-[22%]">
          <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.52931 23.2C5.50442 23.2598 5.49754 23.3255 5.50951 23.3891C5.52149 23.4527 5.55179 23.5114 5.59671 23.558C5.64162 23.6046 5.69917 23.6371 5.76229 23.6514C5.82541 23.6658 5.89134 23.6613 5.95198 23.6387C9.1939 22.58 12.5901 22.0712 16 22.1333C19.4266 22.0718 22.839 22.5893 26.0933 23.664C26.1541 23.6866 26.2202 23.6909 26.2834 23.6765C26.3467 23.6621 26.4043 23.6295 26.4494 23.5828C26.4944 23.5361 26.5248 23.4773 26.5368 23.4135C26.5489 23.3498 26.5421 23.2839 26.5173 23.224L17.54 1.56535C17.4134 1.26119 17.1996 1.00132 16.9255 0.818509C16.6515 0.635702 16.3294 0.538147 16 0.538147C15.6705 0.538147 15.3485 0.635702 15.0744 0.818509C14.8003 1.00132 14.5865 1.26119 14.46 1.56535L5.52931 23.2Z"
              fill="#D0FA3D"
            />
            <path
              d="M16 24.1333C10.3213 24.1333 6.19331 25.368 4.50664 26.6173C4.45574 26.6539 4.4162 26.704 4.3926 26.7621C4.36901 26.8201 4.36232 26.8836 4.37331 26.9453C4.91731 29.912 10.4906 31.4667 16 31.4667C21.5093 31.4667 27.0826 29.916 27.6226 26.9453C27.6336 26.8836 27.6269 26.8201 27.6034 26.7621C27.5798 26.704 27.5402 26.6539 27.4893 26.6173C25.8066 25.364 21.6786 24.1333 16 24.1333Z"
              fill="#D0FA3D"
            />
          </svg>
        </div>

        <div className="w-[56%] h-full px-24">
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

        <div className="w-[22%]"></div>
      </nav>
      {children}
    </div>
  )
}
