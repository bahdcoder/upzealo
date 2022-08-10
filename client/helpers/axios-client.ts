import Axios, { AxiosRequestHeaders } from 'axios'
import { useContext, useMemo } from 'react'
import { AuthCtx } from '../store/auth'
import { config } from './config'

export function getInstance(baseURL = config.apiUrl, headers?: AxiosRequestHeaders) {
  return Axios.create({
    baseURL,
    headers,
  })
}

export function useAxiosInstance() {
  const { authState } = useContext(AuthCtx)
  const instance = useMemo(
    () =>
      getInstance(
        '/',
        authState.authenticated
          ? {
              Authorization: `Bearer ${authState.accessToken}`,
            }
          : undefined
      ),
    [authState]
  )

  return instance
}

export function useApiAxiosInstance() {
  const { authState } = useContext(AuthCtx)
  const instance = useMemo(
    () =>
      getInstance(
        config.apiUrl,
        authState.authenticated
          ? {
              Authorization: `Bearer ${authState.accessToken}`,
            }
          : undefined
      ),
    [authState]
  )

  return instance
}
