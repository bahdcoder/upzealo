import cx from 'classnames'
import { Transition, Dialog } from '@headlessui/react'
import TextareaAutosize from 'react-textarea-autosize'
import {
  PropsWithChildren,
  Fragment,
  useState,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
} from 'react'

import Avatar from './avatar'
import Button, { ActionButton, PrimaryButton } from './button'
import Input from './input'
import AvatarProfile from './avatar-profile'
import { Select } from './select'
import { Modal } from './modal'

export function BountyButton({
  children,
  className,
  isActive,
  onClick,
}: PropsWithChildren<{
  className?: string
  isActive?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}>) {
  return (
    <Button
      onClick={onClick}
      className={cx('hover:bg-[#25DDD1] hover:text-black group', className, {
        'text-black bg-[#25DDD1]': isActive,
      })}
    >
      <svg
        width={14}
        height={17}
        viewBox="0 0 14 17"
        fill="currentColor"
        className={cx('lg:mr-2 group-hover:text-black', {
          'text-black': isActive,
          'text-[#25DDD1]': !isActive,
        })}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H10L11.3574 2.01441C11.543 1.70556 11.5476 1.32081 11.3701 1.00731C11.1926 0.693844 10.8603 0.5 10.5 0.5H9C8.73487 0.5 8.48046 0.605469 8.29296 0.792969L7.5 1.58569L6.70703 0.792969C6.51953 0.605469 6.26512 0.5 6 0.5H3.5C3.13965 0.5 2.80737 0.693844 2.62987 1.00731C2.45237 1.32078 2.45703 1.70556 2.64256 2.01441L4 4Z"
          fill="currentColor"
        />
        <path
          d="M10 5H4C1.76394 6.69966 0 9.88825 0 12.3945C0 16.5 3.719 16.5 7 16.5C10.281 16.5 14 16.5 14 12.3945C14 9.88825 12.2361 6.69966 10 5Z"
          fill="currentColor"
        />
      </svg>

      {children}
    </Button>
  )
}

export function PhotoButton({
  children,
  className,
  isActive,
  onClick,
}: PropsWithChildren<{
  className?: string
  isActive?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}>) {
  return (
    <Button
      onClick={onClick}
      className={cx('hover:bg-primary-500 hover:text-black group', className, {
        'text-black bg-primary-500': isActive,
      })}
    >
      <svg
        width={16}
        height={17}
        viewBox="0 0 16 17"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={cx('lg:mr-2 group-hover:text-black', {
          'text-black': isActive,
          'text-primary-500': !isActive,
        })}
      >
        <g clipPath="url(#clip0_31_49799)">
          <path
            d="M12.0927 7.08973C12.0895 7.08607 12.0864 7.08238 12.0834 7.0786C12.0089 6.98691 11.9128 6.96885 11.8622 6.96623C11.8116 6.96357 11.7141 6.97179 11.6307 7.05535L7.0142 11.679C6.84208 11.8513 6.56704 11.8641 6.3797 11.7085L4.43676 10.0952C4.32241 10.0002 4.15729 10.0012 4.0442 10.0975C4.04276 10.0987 4.04135 10.0999 4.03985 10.1011L0 13.4562V14.4556C0 15.5829 0.917158 16.5001 2.04454 16.5001H13.9555C15.0828 16.5001 16 15.5829 16 14.4556V11.6094L12.0927 7.08973Z"
            fill="currentColor"
          />
          <path
            d="M5.0367 3.41089C4.30338 3.41089 3.70679 4.00748 3.70679 4.74077C3.70679 5.47405 4.30341 6.07064 5.0367 6.07064C5.77001 6.07064 6.36657 5.47405 6.36657 4.74077C6.36657 4.00745 5.77001 3.41089 5.0367 3.41089Z"
            fill="currentColor"
          />
          <path
            d="M13.9555 0.5H2.04454C0.917221 0.5 0 1.41716 0 2.54454V12.2311L3.43576 9.37764C3.89845 8.98592 4.5721 8.98245 5.03879 9.36999L6.65098 10.7087L10.9637 6.38936C11.2131 6.1397 11.5584 6.00698 11.9104 6.02492C12.2601 6.04285 12.5874 6.20792 12.8098 6.47807L16 10.1682V2.54454C16 1.41716 15.0828 0.5 13.9555 0.5ZM5.0367 7.01317C3.78373 7.01317 2.76438 5.99382 2.76438 4.74088C2.76438 3.48794 3.78379 2.4686 5.0367 2.4686C6.28967 2.4686 7.30898 3.48797 7.30898 4.74088C7.30898 5.99382 6.28967 7.01317 5.0367 7.01317Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_31_49799">
            <rect width={16} height={16} fill="white" transform="translate(0 0.5)" />
          </clipPath>
        </defs>
      </svg>

      {children}
    </Button>
  )
}

export function SellButton({
  children,
  className,
  isActive,
  onClick,
}: PropsWithChildren<{
  className?: string
  isActive?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}>) {
  return (
    <Button
      onClick={onClick}
      className={cx('hover:bg-[#DF18FF] hover:text-black group', className, {
        'text-black bg-[#DF18FF]': isActive,
      })}
    >
      <svg
        className={cx('lg:mr-2 group-hover:text-black', {
          'text-black': isActive,
          'text-[#DF18FF]': !isActive,
        })}
        width={16}
        height={15}
        viewBox="0 0 16 15"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0C6.51664 0 5.0666 0.439867 3.83323 1.26398C2.59986 2.08809 1.63856 3.25943 1.07091 4.62987C0.50325 6.00032 0.354725 7.50832 0.644114 8.96318C0.933503 10.418 1.64781 11.7544 2.6967 12.8033C3.7456 13.8522 5.08197 14.5665 6.53683 14.8559C7.99168 15.1453 9.49968 14.9968 10.8701 14.4291C12.2406 13.8614 13.4119 12.9001 14.236 11.6668C15.0601 10.4334 15.5 8.98336 15.5 7.5C15.5 5.51088 14.7098 3.60322 13.3033 2.1967C11.8968 0.790176 9.98913 0 8 0ZM8.5 10.38V10.945C8.5 11.0776 8.44733 11.2048 8.35356 11.2986C8.25979 11.3923 8.13261 11.445 8 11.445C7.86739 11.445 7.74022 11.3923 7.64645 11.2986C7.55268 11.2048 7.5 11.0776 7.5 10.945V10.385C7.25173 10.3112 7.02293 10.1832 6.83012 10.0103C6.6373 9.83738 6.48527 9.62381 6.385 9.385C6.35785 9.30991 6.34908 9.2294 6.35942 9.15022C6.36976 9.07104 6.39891 8.99549 6.44444 8.92989C6.48997 8.86429 6.55055 8.81055 6.62111 8.77316C6.69167 8.73577 6.77016 8.71583 6.85 8.715C6.94872 8.71226 7.04604 8.73882 7.12968 8.79132C7.21333 8.84381 7.27955 8.91991 7.32 9.01C7.37357 9.14642 7.46723 9.2634 7.58862 9.34552C7.71001 9.42764 7.85345 9.47104 8 9.47C8.09694 9.47066 8.19306 9.45214 8.28281 9.41549C8.37256 9.37885 8.45418 9.32482 8.52296 9.2565C8.59174 9.18818 8.64633 9.10693 8.68358 9.01743C8.72083 8.92793 8.74001 8.83194 8.74 8.735C8.74266 8.63567 8.72556 8.53681 8.68968 8.44415C8.65381 8.35149 8.59988 8.26689 8.53103 8.19525C8.46218 8.1236 8.37978 8.06636 8.28862 8.02683C8.19746 7.98731 8.09936 7.96629 8 7.965C7.70327 7.96107 7.41228 7.88259 7.15381 7.73678C6.89534 7.59097 6.67767 7.38252 6.52084 7.13058C6.364 6.87865 6.27303 6.59133 6.25628 6.29504C6.23953 5.99875 6.29755 5.703 6.425 5.435C6.52624 5.21466 6.67521 5.01959 6.86114 4.86393C7.04707 4.70827 7.26529 4.59591 7.5 4.535V3.96C7.5 3.82739 7.55268 3.70021 7.64645 3.60645C7.74022 3.51268 7.86739 3.46 8 3.46C8.13261 3.46 8.25979 3.51268 8.35356 3.60645C8.44733 3.70021 8.5 3.82739 8.5 3.96V4.55C8.77227 4.62886 9.02116 4.77304 9.225 4.97C9.3952 5.13987 9.52952 5.34221 9.62 5.565C9.64134 5.63792 9.64577 5.71475 9.63297 5.78964C9.62017 5.86453 9.59047 5.93552 9.54613 5.99721C9.50178 6.05891 9.44396 6.10969 9.37706 6.14569C9.31015 6.18169 9.23592 6.20198 9.16 6.205C9.06155 6.2096 8.96394 6.185 8.87943 6.13429C8.79492 6.08358 8.72728 6.00903 8.685 5.92C8.64413 5.83115 8.58833 5.74997 8.52 5.68C8.38614 5.54825 8.20771 5.47153 8.02 5.465C7.82502 5.46761 7.63883 5.54657 7.50141 5.68493C7.36399 5.82328 7.28629 6.01 7.285 6.205C7.28576 6.39785 7.35933 6.58329 7.49098 6.72421C7.62264 6.86514 7.80265 6.95114 7.995 6.965C8.4156 6.97443 8.82003 7.12889 9.13983 7.40223C9.45964 7.67557 9.67519 8.051 9.75 8.465C9.80599 8.88106 9.71054 9.30338 9.48107 9.65492C9.2516 10.0065 8.90341 10.2638 8.5 10.38Z"
          fill="currentColor"
        />
      </svg>

      {children}
    </Button>
  )
}

export function VideoButton({
  children,
  className,
  isActive,
  onClick,
}: PropsWithChildren<{
  className?: string
  isActive?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}>) {
  return (
    <Button
      onClick={onClick}
      className={cx('hover:bg-[#9C7BFF] hover:text-black group', className, {
        'text-black bg-[#9C7BFF]': isActive,
      })}
    >
      <svg
        width={16}
        height={17}
        viewBox="0 0 16 17"
        fill="currentColor"
        className={cx('lg:mr-2  group-hover:text-black', {
          'text-black': isActive,
          'text-[#9C7BFF]': !isActive,
        })}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.99998 0.5C3.58172 0.5 0 4.08172 0 8.49998C0 12.9183 3.58172 16.5 7.99998 16.5C12.4183 16.5 16 12.9183 16 8.49998C15.9953 4.08369 12.4163 0.504721 7.99998 0.5ZM11.3691 8.75488C11.3137 8.86598 11.2237 8.95604 11.1125 9.01142V9.01427L6.54113 11.3C6.25881 11.4411 5.91562 11.3266 5.77453 11.0443C5.73442 10.964 5.71376 10.8754 5.71426 10.7857V6.21429C5.71413 5.89869 5.96983 5.64275 6.28543 5.64259C6.37419 5.64255 6.46175 5.66318 6.54113 5.70285L11.1125 7.98858C11.395 8.12934 11.5099 8.47243 11.3691 8.75488Z"
          fill="currentColor"
        />
      </svg>

      {children}
    </Button>
  )
}

export enum PostType {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
  BOUNTY = 'BOUNTY',
  SELL = 'SELL',
}

export function CreatePostModal({
  type = PostType.PHOTO,
  isOpen,
  setIsOpen,
  setType,
}: PropsWithChildren<{
  type?: PostType
  isOpen?: boolean
  setType: Dispatch<SetStateAction<PostType>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}>) {
  const [step, setStep] = useState(0)

  function closeModal() {
    setIsOpen(false)
  }

  function resolveTitle() {
    if (type === PostType.SELL) {
      return 'Select NFT'
    }

    if (type === PostType.BOUNTY) {
      return 'Create Bounty'
    }

    return 'Create Post'
  }

  const types = (
    <div className="flex items-center space-x-2 mt-4">
      <PhotoButton
        onClick={() => setType(PostType.PHOTO)}
        isActive={type === PostType.PHOTO}
        className={cx('px-3 py-3 text-xs', {
          'opacity-50': type !== PostType.PHOTO,
        })}
      >
        <div className="hidden lg:inline">Photo</div>
      </PhotoButton>
      <VideoButton
        onClick={() => setType(PostType.PHOTO)}
        isActive={false}
        className={cx('px-3 py-3 text-xs', {
          'opacity-50': type !== PostType.VIDEO,
        })}
      >
        <div className="hidden lg:inline">Video</div>
      </VideoButton>
      <BountyButton
        onClick={() => setType(PostType.BOUNTY)}
        isActive={type === PostType.BOUNTY}
        className={cx('px-3 py-3 text-xs', {
          'opacity-50': type !== PostType.BOUNTY,
        })}
      >
        <div className="hidden lg:inline">Bounty</div>
      </BountyButton>
      <SellButton
        onClick={() => setType(PostType.SELL)}
        isActive={type === PostType.SELL}
        className={cx('px-3 py-3 text-xs', {
          'opacity-50': type !== PostType.SELL,
        })}
      >
        <div className="hidden lg:inline">Sell</div>
      </SellButton>
    </div>
  )

  const placeholder =
    type === PostType.BOUNTY ? 'What do you need help with?' : "What's on your mind?"

  return (
    <Modal isOpen={isOpen} setIsOpen={() => closeModal()} title={resolveTitle()}>
      {type === PostType.SELL ? (
        <>
          {step === 0 ? (
            <>
              <Input placeholder="Search for an nft..." />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-6 h-[32rem] lg:h-[24rem] max-h-[32rem] lg:max-h-[24rem] overflow-y-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                  (x) => (
                    <button
                      className="flex flex-col border-2 border-transparent hover:border-primary-500 p-2 rounded-lg transition ease-linear"
                      key={x}
                    >
                      <img
                        className="object-cover object-center rounded-lg"
                        src="https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://metadata.degods.com/g/9377-dead.png"
                        alt=""
                      />
                      <p className="mt-2 text-xs text-left">Banana Baby #1223</p>
                    </button>
                  )
                )}
              </div>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div className="flex justify-start my-4 space-x-6">
                <div className="w-1/3">
                  <img
                    className="rounded-xl"
                    src="https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://metadata.degods.com/g/9377-dead.png"
                    alt=""
                  />
                </div>

                <div className="w-2/3">
                  <Input placeholder="5 SOL" label="Amount (in SOL)" type="number" min={0} />

                  <span className="text-xs mt-1 text-dark-300">$32,23</span>
                </div>
              </div>
            </>
          ) : null}

          <div className="flex flex-col absolute lg:static bottom-0 pb-8 pt-8 lg:pb-0">
            {types}

            <div className="mt-6 flex items-center space-x-4">
              {step === 0 ? null : (
                <ActionButton onClick={() => setStep(0)} className="bg-dark-300 px-12 py-4">
                  Back
                </ActionButton>
              )}
              <PrimaryButton onClick={() => setStep(1)} className="px-16">
                {step === 0 ? 'Next' : 'Publish'}
              </PrimaryButton>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-6">{/* <AvatarProfile  /> */}</div>

          <div className="my-6">
            <TextareaAutosize
              autoFocus
              placeholder={placeholder}
              className="bg-transparent min-h-[5rem] text-white focus:outline-none w-full text-md resize-none placeholder:text-dark-300"
            />
          </div>

          <div className="flex flex-col absolute bottom-0 lg:static pb-8 lg:pb-0 w-[88%] lg:w-full">
            {type === PostType.BOUNTY ? (
              <div className="w-full">
                <label htmlFor="" className="text-sm text-white font-bold">
                  Bounty amount
                </label>
                <div className="flex items-center relative my-4 w-full ">
                  <Input className="w-full" placeholder="Amount" type="number" />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Select
                      options={[
                        {
                          id: '1',
                          name: 'USDC',
                          image:
                            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="my-2">{types}</div>

            <div className="mt-6">
              <PrimaryButton className="px-12">Publish</PrimaryButton>
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<PostType>(PostType.PHOTO)

  function setTypeAndOpen(type: PostType) {
    setType(type)
    setIsOpen(true)
  }

  return (
    <div className="w-full rounded-3xl bg-black p-6">
      <CreatePostModal isOpen={isOpen} setIsOpen={setIsOpen} type={type} setType={setType} />

      <div className="flex items-center">
        <div className="mr-4">
          <Avatar url="https://pbs.twimg.com/profile_images/1537681214546616320/xC9xGPn3_400x400.jpg" />
        </div>

        <button className="w-full cursor-pointer" onClick={() => setIsOpen(true)}>
          <Input placeholder="What's happening?" className="cursor-pointer" readOnly />
        </button>
      </div>

      <div className="flex items-center space-x-2 lg:pl-16 mt-4">
        <PhotoButton className="w-full" onClick={() => setTypeAndOpen(PostType.PHOTO)}>
          <div className="hidden lg:block">Photo</div>
        </PhotoButton>
        <VideoButton className="w-full" onClick={() => setTypeAndOpen(PostType.PHOTO)}>
          <div className="hidden lg:block">Video</div>
        </VideoButton>
        <BountyButton className="w-full" onClick={() => setTypeAndOpen(PostType.BOUNTY)}>
          <div className="hidden lg:block">Bounty</div>
        </BountyButton>
        <SellButton className="w-full" onClick={() => setTypeAndOpen(PostType.SELL)}>
          <div className="hidden lg:block">Sell</div>
        </SellButton>
      </div>
    </div>
  )
}
