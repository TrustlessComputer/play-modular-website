/* eslint-disable react-hooks/rules-of-hooks */
import { BareFetcher, SWRConfiguration, unstable_serialize } from 'swr'
import useSWR from 'swr/infinite'
import axios from 'axios'

export const reorderKeys = (obj = {} as any) => {
  const newObj = {} as any
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      newObj[key] = obj[key]
    })
  return newObj
}

export const getApiKey = (fetcher: BareFetcher, params?: string | Record<string, unknown>): string => {
  return unstable_serialize([fetcher.name, typeof params === 'string' ? params : reorderKeys(params)])
}

export const swrFetcher = async (url: string): Promise<unknown> => {
  return axios.get(url).then((res) => res.data)
}

export type ApiHook<T> = {
  data: T
  isEmpty?: boolean
  isLoading?: boolean
  isValidating?: boolean
  error?: string
  hasFirstFetching?: boolean
  refresh?: () => void
}

type Data = any

export const useApi = (
  fetcher: BareFetcher,
  params?: Record<string, unknown> | string,
  config?: SWRConfiguration & { shouldFetch?: boolean },
): ApiHook<Data> => {
  const shouldFetch = typeof config?.shouldFetch === 'undefined' ? true : config?.shouldFetch

  try {
    const { data, error, isValidating, isLoading, setSize } = useSWR<Data>(
      () => (shouldFetch ? [fetcher.name, typeof params === 'string' ? params : reorderKeys(params)] : null),
      async () => {
        const result = await fetcher(params)
        return result
      },
      config,
    )
    const isEmpty = data?.[0]?.length === 0
    const hasFirstFetching = !!data

    return {
      data: data?.[0] || [],
      isLoading,
      isValidating,
      isEmpty,
      error,
      hasFirstFetching,
      refresh: () => setSize(1),
    }
  } catch (error) {
    return {
      data: [],
    }
  }
}

export default useApi
