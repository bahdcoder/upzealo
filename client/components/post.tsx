import { useWallet } from '@solana/wallet-adapter-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import cx from 'classnames'
import { PropsWithChildren, useState, MouseEventHandler } from 'react'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { useApiAxiosInstance } from '../helpers/axios-client'
import { config } from '../helpers/config'
import { formatNumber } from '../helpers/currencies'
import { toDiffForHumans } from '../helpers/dates'
import { SolanaProgram } from '../helpers/solana'
import { Comment, Post as PostInterface, PostType, useAuth, UserProfile } from '../store/auth'
import Avatar from './avatar'
import AvatarProfile from './avatar-profile'
import { ActionButton, PrimaryButton, Spinner } from './button'
import Input from './input'
import { ToggleFade } from './toggle-transition'

export function LikeButton({
  liked,
  onClick,
}: PropsWithChildren<{ liked?: boolean; onClick?: MouseEventHandler<HTMLButtonElement> }>) {
  return (
    <ActionButton
      onClick={() => toast(`Coming soon.`)}
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

export function PostLoader() {
  const defaultProps = {
    count: 1,
    duration: 1,
    baseColor: '#000000',
    highlightColor: '#1F2024',
  }

  return (
    <div className="bg-black/30 p-6 rounded-2xl mb-4">
      <div className="mb-3 flex items-center">
        <Skeleton {...defaultProps} circle borderRadius={9999} count={1} height={64} width={64} />

        <div className="flex flex-col w-full pl-6 pt-4">
          <div className="w-1/3">
            <Skeleton {...defaultProps} height={12} borderRadius={8} />
          </div>
          <div className="w-[25%]">
            <Skeleton {...defaultProps} height={12} borderRadius={8} />
          </div>
        </div>
      </div>
      <div className="pl-[88px]">
        <Skeleton {...defaultProps} height={12} borderRadius={8} />

        <div className="w-[80%]">
          <Skeleton {...defaultProps} height={12} borderRadius={8} />
        </div>
        <div className="w-[40%]">
          <Skeleton {...defaultProps} height={12} borderRadius={8} />
        </div>
      </div>
    </div>
  )
}

export function PostsLoading() {
  return (
    <>
      <PostLoader />
      <PostLoader />
    </>
  )
}

export function Comments({
  post,
  refreshPost,
}: PropsWithChildren<{ post: PostInterface; refreshPost?: () => Promise<any> }>) {
  const instance = useApiAxiosInstance()
  const [content, setContent] = useState('')
  const wallet = useWallet()

  const isBounty = post.type === PostType.BOUNTY

  const { profile } = useAuth()

  const isOwnerViewing = post.userId === profile.id

  const { data: comments = [], refetch } = useQuery<Comment[]>(
    ['post-comments', post.id],
    async () => {
      const response = await instance.get(`/feed/posts/${post.id}/comments`)

      return response.data.data
    }
  )

  const { isLoading: isPostingComment, mutate: publishComment } = useMutation(async () => {
    await instance.post(`/feed/posts/${post.id}/comments`, {
      content,
    })

    await refetch()

    setContent('')
  })

  const { isLoading: isAcceptingBountyAnswer, mutate: acceptAnswer } = useMutation(
    async (comment: Comment) => {
      const program = new SolanaProgram(wallet)
      const winnerWalletAddress = comment.user.addresses[0].publicKey
      const userAddress = profile.solanaAddress
      const bountyAddress = post.bounty.bountyAddress
      const mintAddress = post.bounty.currencyMint
      const bountyCreatorAddress = profile.addresses[0].publicKey

      const { signature } = await program.claimBountyTransaction({
        bountyAddress,
        bountyCreatorAddress,
        winnerWalletAddress,
        userAddress,
        mintAddress,
      })

      await instance.put(`/feed/bounties/${post.bounty.id}`, {
        commentId: comment.id,
        signature,
      })

      await refetch()
      await refreshPost?.()
    },
    {
      onError(error) {
        console.error(error)
        toast.error(`Failed to accept answer. Please try again.`)
      },
    }
  )

  const winnerAccepted = post?.bounty?.winnerId !== undefined && post.bounty.winnerId !== null

  return (
    <div className="">
      <div className="w-full border border-dark-700 my-6"></div>

      {comments.map((comment) => (
        <div className="w-full mb-4" key={comment.id}>
          <AvatarProfile
            size="small"
            profile={comment.user}
            subtitle={`${toDiffForHumans(comment.createdAt)} ago`}
          />

          <div className="pl-12 mt-4">
            <p
              className={classNames(
                'py-3 min-h-[3rem] inline-flex items-center px-4 rounded-lg bg-dark-700 text-white text-sm',
                {
                  'border border-primary-500 bg-primary-500/10':
                    isBounty && post.bounty?.commentId === comment.id,
                }
              )}
            >
              {comment.content}
            </p>

            <div className="mt-2 flex">
              <button className="text-dark-300 hover:text-white transition ease-linear text-xs">
                Like
              </button>
              <button className="text-dark-300 hover:text-white transition ease-linear ml-4 text-xs">
                Reply
              </button>

              {isOwnerViewing && isBounty && comment.userId !== profile.id && !winnerAccepted ? (
                <button
                  className="text-xs ml-3 text-primary-500 font-grotesk cursor-pointer flex items-center"
                  disabled={isAcceptingBountyAnswer}
                  onClick={() => acceptAnswer(comment)}
                >
                  Accept answer{' '}
                  {isAcceptingBountyAnswer ? (
                    <Spinner className="ml-3 w-4 h-4 animate-spin" />
                  ) : null}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4 flex items-start w-full">
        <Avatar size="small" url={profile.avatarUrl} />

        <div className="ml-4 w-full relative">
          <Input
            placeholder="Write a comment.."
            className="text-xs"
            value={content}
            textarea
            onChange={(event: any) => setContent(event.target.value)}
          />

          <div className="flex w-full justify-end mt-3">
            <PrimaryButton
              className="px-4 py-2 text-xs"
              isLoading={isPostingComment}
              isDisabled={!content || content.length < 6}
              onClick={() => publishComment()}
            >
              Comment
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export function getSupportedCurrencies() {
  const isDevnet = config.solanaEnvironment === 'devnet'

  return [
    {
      symbol: 'USDC',
      logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
      mint: isDevnet
        ? 'E5TGw3nHURLMydUkUd42LwNzjuLYoo22KCm7CrnUSxiC'
        : 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      decimals: 6,
    },
    {
      symbol: 'MNGO',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11171.png',
      mint: isDevnet ? '' : 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
      decimals: 6,
    },
    {
      symbol: 'SHDW',
      logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y/logo.png',
      mint: isDevnet
        ? 'BXJ5SSmMb4Vp9U45enozuNcdSpDdssvymHyLB4jj2EDX'
        : 'SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y',
      decimals: 9,
    },
    {
      symbol: 'JELLY',
      logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9WMwGcY6TcbSfy9XPpQymY3qNEsvEaYL3wivdwPG2fpp/logo.png',
      mint: isDevnet ? '' : '9WMwGcY6TcbSfy9XPpQymY3qNEsvEaYL3wivdwPG2fpp',
      decimals: 6,
    },
  ].filter((token) => token.mint)
}

export default function Post({
  post,
  refresh,
}: PropsWithChildren<{ post: PostInterface; refresh?: () => Promise<any> }>) {
  const [showingComments, setShowingComments] = useState(false)

  const isBounty = post.type === PostType.BOUNTY

  const currency = getSupportedCurrencies().find(
    (currency) => currency.mint === post.bounty?.currencyMint
  )

  function getFormattedAmount(amount: number) {
    const balance = amount / 10 ** (currency?.decimals || 0)

    return formatNumber(balance)
  }

  return (
    <div className="w-full bg-black rounded-3xl p-6">
      <div className="w-full flex items-center justify-between">
        <AvatarProfile profile={post.user} subtitle={`${toDiffForHumans(post.createdAt)} ago`} />

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
          <p className="prose prose-md text-white text-sm">{post.content}</p>

          {isBounty ? (
            <div className="flex my-3 items-center">
              <div className="rounded-3xl bg-blue-800 py-2 text-sm px-4 font-grotesk font-semibold text-white flex items-center">
                <img
                  src={currency?.logo}
                  alt={currency?.symbol}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <p className={classNames({ 'line-through': post.bounty.winnerId })}>
                  {getFormattedAmount(post.bounty.amount)}{' '}
                  <span className="ml-2">{currency?.symbol}</span>
                </p>
              </div>

              {post.bounty.winnerId ? (
                <div className="rounded-full border-2 border-primary-500 w-10 h-10 flex items-center justify-center ml-2">
                  {post.bounty.winner ? (
                    <img
                      src={post.bounty.winner.avatarUrl}
                      className="w-6 h-6 rounded-full"
                      alt="winner avatar"
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          <div
            className={classNames('w-full mt-4 grid gap-4', {
              'grid-cols-2': post.attachments.length > 1,
              'grid-cols-1': post.attachments.length === 1,
            })}
          >
            {post.attachments.map((attachment) => (
              <img
                src={attachment.url}
                alt="post cover"
                key={attachment.id}
                className="rounded-2xl w-full"
              />
            ))}
          </div>
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
            0
          </p>
          <p className="text-dark-300 text-sm">{post.meta.comments_count} comments</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <LikeButton />

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

          <ActionButton onClick={() => toast('Coming soon.')}>
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
          <Comments post={post} refreshPost={refresh} />
        </ToggleFade>
      </div>
    </div>
  )
}
