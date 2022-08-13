import '../styles/globals.css'
import '../styles/badges.css'
import '../styles/satoshi.css'

import BaseApp from 'next/app'
import { withIronSessionSsr } from 'iron-session/next'
import { QueryClientProvider } from '@tanstack/react-query'

import type { AppContext, AppProps, AppInitialProps } from 'next/app'

import { queryClient } from '../helpers/query-client'

import Layout from '../components/layout'

import { AuthContextProvider, AuthContextWrapper } from '../store/auth-ctx'
import { getIronSession } from 'iron-session'
import { ironSessionOptions } from '../helpers/session'

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextWrapper isAuthenticated={pageProps.user !== undefined}>
        <AuthContextProvider defaultAuthState={pageProps.user ? { ...pageProps.user, authenticated: true } : undefined}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </AuthContextWrapper>
    </QueryClientProvider>
  )
}

App.getInitialProps = async function (appCtx: AppContext) {
  const appProps = await BaseApp.getInitialProps(appCtx)

  if (appCtx.ctx.req && appCtx.ctx.res) {
    const { user } = await getIronSession(
      appCtx.ctx.req,
      appCtx.ctx.res,
      ironSessionOptions
    )

    if (!user) {
      return {
        ...appProps
      }
    }

    return {
      ...appProps,
      pageProps: { ...appProps.pageProps, user }
    }
  }

  return { ...appProps }
}

export default App
