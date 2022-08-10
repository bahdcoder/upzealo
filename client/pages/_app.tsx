import '../styles/globals.css'
import '../styles/satoshi.css'

import { QueryClientProvider } from '@tanstack/react-query'

import type { AppProps } from 'next/app'

import { queryClient } from '../helpers/query-client'

import Layout from '../components/layout'

import { AuthContextProvider, AuthContextWrapper } from '../store/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextWrapper>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </AuthContextWrapper>
    </QueryClientProvider>
  )
}

export default MyApp
