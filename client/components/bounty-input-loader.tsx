import Skeleton from 'react-loading-skeleton'

export function BountyInputLoader() {
  return (
    <Skeleton
      count={1}
      baseColor={'#000000'}
      highlightColor={'#1F2024'}
      duration={1}
      height={48}
      borderRadius={8}
    />
  )
}
