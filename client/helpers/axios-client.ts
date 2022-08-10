import Axios from 'axios'
import { useMemo } from 'react'
import { config } from './config'

export function getInstance(baseURL = config.apiUrl) {
  return Axios.create({
    baseURL,
  })
}

export function useAxiosInstance() {
  const instance = useMemo(() => getInstance(), [])

  return instance
}

export function useApiAxiosInstance() {
  const instance = useMemo(() => getInstance('/'), [])

  return instance
}
