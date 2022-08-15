import '../styles/globals.css'
import '../styles/badges.css'
import '../styles/satoshi.css'
import 'plyr-react/plyr.css'
import 'react-loading-skeleton/dist/skeleton.css'

import BaseApp from 'next/app'
import { withIronSessionSsr } from 'iron-session/next'
import { QueryClientProvider } from '@tanstack/react-query'

import type { AppContext, AppProps, AppInitialProps } from 'next/app'

import { queryClient } from '../helpers/query-client'

import Layout from '../components/layout'

import { AuthContextProvider, AuthContextWrapper } from '../store/auth-ctx'
import { getIronSession } from 'iron-session'
import { ironSessionOptions } from '../helpers/session'
import { getInstance } from '../helpers/axios-client'
import { config } from '../helpers/config'

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextWrapper isAuthenticated={pageProps.user !== undefined}>
        <AuthContextProvider
          defaultAuthState={pageProps.user ? { ...pageProps.user, authenticated: true } : undefined}
          defaultProfile={pageProps.profile}
        >
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
    const session = await getIronSession(appCtx.ctx.req, appCtx.ctx.res, ironSessionOptions)

    const { user } = session

    if (!user) {
      return {
        ...appProps,
      }
    }

    const axios = getInstance(config.apiUrl, {
      Authorization: `Bearer ${user?.accessToken}`,
    })

    try {
      const response = await axios.get('/auth/me')

      return {
        ...appProps,
        pageProps: { ...appProps.pageProps, user, profile: response.data },
      }
    } catch (error) {
      session.destroy()

      console.log('DELETED')

      return {
        ...appProps,
      }
    }
  }

  return { ...appProps }
}

export default App
