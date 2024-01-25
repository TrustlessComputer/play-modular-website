import axios from 'axios'

import LocalStorage from '@/utils/storage/local-storage'
import { STORAGE_KEY_TOKEN } from '@/constant/storage-key'
import { camelCaseKeys } from '@/utils/normalize'

export const TIMEOUT = 5 * 60000
export const HEADERS = { 'Content-Type': 'application/json' }

const createAxiosInstance = ({ baseURL = '' }: { baseURL: string }) => {
  const instance = axios.create({
    baseURL,
    timeout: TIMEOUT,
    headers: {
      ...HEADERS,
    },
  })

  instance.interceptors.request.use(
    (config) => {
      const token = LocalStorage.get(STORAGE_KEY_TOKEN)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    (res) => {
      let result = res?.data?.data || res?.data?.result
      result = Object(camelCaseKeys(result)) // force convert to camel case
      if (res?.data?.count !== undefined) {
        result.count = res.data.count
      }
      const error = res?.data?.error
      if (error && Object.keys(error).length) {
        return Promise.reject(error)
      }
      return Promise.resolve(result)
    },
    (error: any) => {
      if (!error.response) {
        return Promise.reject(error)
      } else {
        const response = error?.response?.data || error
        const errorMessage = response?.error || error?.Message || JSON.stringify(error)
        return Promise.reject(errorMessage)
      }
    },
  )

  return instance
}

export default createAxiosInstance
