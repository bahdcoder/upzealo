import { IronSessionOptions } from 'iron-session'
import { withIronSessionSsr } from 'iron-session/next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export const ironSessionOptions: IronSessionOptions = {
  cookieName: 'upzealo',
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export function withGetServerSideProps<
  P extends {
    [key: string]: unknown
  } = {
    [key: string]: unknown
  }
>(
  fn: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(fn, ironSessionOptions)
}
