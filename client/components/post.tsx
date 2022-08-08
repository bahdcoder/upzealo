import cx from 'classnames'
import { PropsWithChildren, useState, MouseEventHandler } from 'react'
import Avatar from './avatar'
import AvatarProfile from './avatar-profile'
import { ActionButton } from './button'
import Input from './input'
import { ToggleFade } from './toggle-transition'

export function LikeButton({
  children,
  liked,
  onClick,
}: PropsWithChildren<{ liked?: boolean; onClick?: MouseEventHandler<HTMLButtonElement> }>) {
  return (
    <ActionButton
      onClick={onClick}
      className={cx({
        'bg-[#df18ff] bg-opacity-20 border-transparent': liked,
      })}
    >
      <svg
        className={cx({ 'text-dark-300': !liked, 'text-[#df18ff]': liked })}
        width={16}
        height={14}
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3143 0.0591782C11.6277 -0.0545141 10.9234 -0.00389425 10.2608 0.206769C9.59825 0.417432 8.9968 0.781963 8.50718 1.26963L7.98143 1.78623L7.45569 1.26825C6.62994 0.474534 5.52025 0.0329527 4.36663 0.0390094C3.21301 0.045066 2.10816 0.498273 1.29104 1.30062C0.473923 2.10296 0.010201 3.18996 0.000166295 4.32652C-0.0098684 5.46308 0.43459 6.55786 1.23742 7.37408L7.478 13.7891C7.54307 13.8558 7.62113 13.9088 7.70752 13.9451C7.79391 13.9813 7.88684 14 7.98073 14C8.07463 14 8.16756 13.9813 8.25395 13.9451C8.34034 13.9088 8.4184 13.8558 8.48347 13.7891L14.7129 7.38645C15.3651 6.74492 15.7956 5.91726 15.9433 5.02099C16.091 4.12473 15.9484 3.20539 15.5357 2.39352C15.228 1.77844 14.7748 1.24528 14.2141 0.839008C13.6535 0.432736 13.0019 0.165271 12.3143 0.0591782Z"
          fill="currentColor"
        />
      </svg>

      <span
        className={cx('ml-3 hidden lg:inline', {
          'text-[#df18ff]': liked,
        })}
      >
        {liked ? 'Liked' : 'Like'}
      </span>
    </ActionButton>
  )
}

export default function Post({ image, ...rest }: PropsWithChildren<{ image?: boolean }>) {
  const [showingComments, setShowingComments] = useState(false)

  return (
    <div className="w-full bg-black rounded-3xl p-6">
      <div className="w-full flex items-center justify-between">
        <AvatarProfile subTitle="12 February" />

        <button>
          <svg
            width={24}
            height={24}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5" clipPath="url(#clip0_1_141)">
              <path
                d="M2.16667 10.1667C3.36328 10.1667 4.33333 9.19661 4.33333 7.99999C4.33333 6.80338 3.36328 5.83333 2.16667 5.83333C0.97005 5.83333 0 6.80338 0 7.99999C0 9.19661 0.97005 10.1667 2.16667 10.1667Z"
                fill="#9CB6C5"
              />
              <path
                d="M7.99999 10.1667C9.19661 10.1667 10.1667 9.19661 10.1667 7.99999C10.1667 6.80338 9.19661 5.83333 7.99999 5.83333C6.80338 5.83333 5.83333 6.80338 5.83333 7.99999C5.83333 9.19661 6.80338 10.1667 7.99999 10.1667Z"
                fill="#9CB6C5"
              />
              <path
                d="M13.8333 10.1667C15.03 10.1667 16 9.19661 16 7.99999C16 6.80338 15.03 5.83333 13.8333 5.83333C12.6367 5.83333 11.6667 6.80338 11.6667 7.99999C11.6667 9.19661 12.6367 10.1667 13.8333 10.1667Z"
                fill="#9CB6C5"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_141">
                <rect width={16} height={16} fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      <div className="lg:pl-16">
        <div className="mt-2 text-white">
          <p>Let’s set an age limit after which you can’t run for political office.</p>

          {image ? (
            <div className="w-full mt-4">
              <img
                src="https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/297358499_4978326928938901_5330389093075701625_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeEX8f0v93cpfGk8P0KN_EQhjr5XCHHCSAaOvlcIccJIBhh7UHfa-33I4FVE-rKLmCH34cpC1MDE0eHzFHur8_u0&_nc_ohc=Kmh4Xysm0dgAX_C3rh3&_nc_zt=23&_nc_ht=scontent-los2-1.xx&oh=00_AT-wlUDzQrCejOUKcc9Q4D_bSP8bUKuYWS2jaOlXvEkuhw&oe=62F2D829"
                alt="post cover"
                className="rounded-lg w-full"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-dark-300 flex items-center">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx={8} cy={8} r={8} fill="#FF2B84" />
              <path
                d="M10.6964 3.59697C10.2673 3.52484 9.82713 3.55695 9.41302 3.69059C8.99891 3.82423 8.623 4.05548 8.31698 4.36484L7.9884 4.69255L7.65981 4.36396C7.14371 3.86045 6.45016 3.58033 5.72914 3.58417C5.00813 3.58801 4.3176 3.87551 3.8069 4.3845C3.2962 4.89348 3.00638 5.58303 3.0001 6.30403C2.99383 7.02503 3.27162 7.71952 3.77339 8.23731L7.67375 12.3068C7.71442 12.3491 7.76321 12.3827 7.8172 12.4057C7.87119 12.4287 7.92927 12.4406 7.98796 12.4406C8.04664 12.4406 8.10472 12.4287 8.15872 12.4057C8.21271 12.3827 8.2615 12.3491 8.30217 12.3068L12.1956 8.24515C12.6032 7.83818 12.8723 7.31315 12.9646 6.74458C13.0569 6.17602 12.9677 5.59282 12.7098 5.0778C12.5175 4.68761 12.2342 4.34939 11.8838 4.09167C11.5334 3.83394 11.1262 3.66427 10.6964 3.59697Z"
                fill="white"
              />
            </svg>
            3
          </p>
          <p className="text-dark-300 text-sm">45 comments</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <LikeButton liked />

          <ActionButton onClick={() => setShowingComments(true)}>
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0.891357C3.77267 0.891357 0.333336 3.72469 0.333336 7.20736C0.346371 8.04457 0.542627 8.86877 0.908307 9.62202C1.27399 10.3753 1.80022 11.0393 2.45 11.5674L0.916669 14.6254C0.885607 14.6873 0.874605 14.7573 0.885194 14.8258C0.895783 14.8942 0.927436 14.9577 0.975754 15.0073C1.02407 15.057 1.08665 15.0903 1.1548 15.1028C1.22295 15.1152 1.29327 15.1061 1.356 15.0767L5.45534 13.1687C6.28261 13.4063 7.13928 13.5259 8 13.524C12.2273 13.524 15.6667 10.6907 15.6667 7.20736C15.6667 3.72402 12.2273 0.891357 8 0.891357Z"
                fill="#717E84"
              />
            </svg>

            <span className="ml-3 hidden lg:inline">Comment</span>
          </ActionButton>

          <ActionButton>
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_31_49905)">
                <path
                  d="M10.1667 6.83278C10.1225 6.83278 10.0801 6.85034 10.0488 6.88159C10.0176 6.91285 10 6.95524 10 6.99945V14.4994H1.33333V5.83278H3.502C3.54574 5.83225 3.58752 5.81455 3.61833 5.7835C3.64913 5.75244 3.66649 5.71052 3.66667 5.66678C3.6711 5.34206 3.70975 5.01872 3.782 4.70211C3.78737 4.67773 3.78722 4.65245 3.78155 4.62813C3.77589 4.60382 3.76485 4.58108 3.74925 4.56158C3.73365 4.54208 3.71389 4.52632 3.69141 4.51546C3.66893 4.50459 3.6443 4.49889 3.61933 4.49878H1.33333C0.979711 4.49878 0.640573 4.63926 0.390524 4.8893C0.140476 5.13935 0 5.47849 0 5.83211L0 14.4988C0 14.8524 0.140476 15.1915 0.390524 15.4416C0.640573 15.6916 0.979711 15.8321 1.33333 15.8321H10C10.3536 15.8321 10.6928 15.6916 10.9428 15.4416C11.1929 15.1915 11.3333 14.8524 11.3333 14.4988V7.00011C11.3333 6.95591 11.3158 6.91352 11.2845 6.88226C11.2533 6.85101 11.2109 6.83345 11.1667 6.83345L10.1667 6.83278Z"
                  fill="#717E84"
                />
                <path
                  d="M12.9147 0.276622C12.8696 0.226443 12.8104 0.191115 12.7448 0.175304C12.6792 0.159493 12.6104 0.163944 12.5474 0.188069C12.4844 0.212193 12.4303 0.254856 12.392 0.310422C12.3538 0.365988 12.3333 0.431844 12.3333 0.499289V1.66662C12.3334 1.68853 12.3292 1.71025 12.3208 1.73051C12.3125 1.75077 12.3002 1.76918 12.2847 1.78467C12.2692 1.80016 12.2508 1.81244 12.2305 1.82078C12.2103 1.82913 12.1886 1.83338 12.1667 1.83329H8.58666C7.54827 1.83364 6.55242 2.24584 5.81755 2.97946C5.08267 3.71309 4.66878 4.70824 4.66666 5.74662C4.66351 6.48966 4.87687 7.21753 5.28066 7.84129C5.31495 7.89503 5.36394 7.9378 5.42181 7.96455C5.47967 7.99129 5.54399 8.00088 5.60714 7.99218C5.6703 7.98348 5.72963 7.95685 5.77811 7.91546C5.82658 7.87406 5.86218 7.81963 5.88066 7.75862C6.05882 7.20136 6.40888 6.71484 6.88064 6.36883C7.3524 6.02283 7.92162 5.83512 8.50666 5.83262H12.1667C12.1886 5.83262 12.2103 5.83696 12.2306 5.84537C12.2509 5.85379 12.2693 5.86613 12.2847 5.88167C12.3002 5.89722 12.3125 5.91567 12.3208 5.93597C12.3292 5.95627 12.3334 5.97801 12.3333 5.99996V7.16662C12.3332 7.23412 12.3536 7.30007 12.3918 7.35574C12.4299 7.41141 12.4841 7.45418 12.5471 7.47839C12.6101 7.5026 12.679 7.5071 12.7446 7.49131C12.8103 7.47552 12.8696 7.44018 12.9147 7.38996L15.9147 4.05662C15.9698 3.99541 16.0002 3.91598 16.0002 3.83362C16.0002 3.75127 15.9698 3.67183 15.9147 3.61062L12.9147 0.276622Z"
                  fill="#717E84"
                />
              </g>
              <defs>
                <clipPath id="clip0_31_49905">
                  <rect width={16} height={16} fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="ml-3 hidden lg:inline">Share</span>
          </ActionButton>
        </div>

        <ToggleFade show={showingComments}>
          <div className="">
            <div className="w-full border border-dark-700 my-6"></div>

            <div className="w-full">
              <AvatarProfile size="small" subTitle="A few minutes ago" />

              <div className="pl-12 mt-2">
                <p className="py-3 min-h-[3rem] inline-flex items-center px-4 rounded-lg bg-dark-700 text-white text-sm">
                  I couldn’t agree more.
                </p>

                <div className="mt-2">
                  <button className="text-dark-300 hover:text-white transition ease-linear text-xs">
                    Like
                  </button>
                  <button className="text-dark-300 hover:text-white transition ease-linear ml-4 text-xs">
                    Reply
                  </button>
                  <span className="text-dark-300 ml-4 text-xs">32m</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center w-full">
              <Avatar
                size="small"
                url="https://pbs.twimg.com/profile_images/1537681214546616320/xC9xGPn3_400x400.jpg"
              />

              <div className="ml-4 w-full relative">
                <Input placeholder="Write a comment.." />
              </div>
            </div>
          </div>
        </ToggleFade>
      </div>
    </div>
  )
}
