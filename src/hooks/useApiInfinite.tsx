import { BareFetcher, SWRConfiguration } from 'swr'
import useSWRInfinite, { unstable_serialize } from 'swr/infinite'
import { reorderKeys } from './useApi'

export type ApiInfiniteHook<T> = {
  dataInfinite?: Array<T>
  data?: T
  isLoadingMore: boolean
  isEmpty: boolean
  isReachingEnd: boolean
  isRefreshing: boolean
  isValidating: boolean
  hasFirstFetching: boolean
  page: number
  error: string
  loadMore: () => void
  refresh: () => void
  clear: () => void
  totalItems: number
}

type Data = any

export const getApiInfiniteKey = (fetcher: BareFetcher, params?: Record<string, unknown>): string => {
  return unstable_serialize((currentPage) => {
    return [
      fetcher.name,
      reorderKeys({
        page: currentPage + 1,
        ...params,
      }),
    ]
  })
}

export const useApiInfinite = (
  fetcher: BareFetcher,
  params?: Record<string, unknown>,
  config?: SWRConfiguration & { shouldFetch?: boolean; parallel?: boolean },
): ApiInfiniteHook<Data> => {
  const limit = params?.limit || 10
  const shouldFetch = typeof config?.shouldFetch === 'undefined' ? true : config?.shouldFetch // Conditional fetching default is true

  const { data, mutate, size, setSize, isValidating, isLoading, error } = useSWRInfinite<Data>(
    (currentPage) => {
      return shouldFetch
        ? [
            fetcher.name,
            {
              ...params,
              limit,
              page: currentPage + 1, // Incremented index
            },
          ]
        : null
    },
    async ([_, filter]) => {
      const result = await fetcher(filter)
      return result
    },
    {
      revalidateFirstPage: false, //  To validate first page before the call of every next page
      ...config,
    },
  )
  const total = data?.[0]?.total || 0
  const dataInfinite = []
  data?.forEach((item) => item?.list?.map((subItem: unknown) => dataInfinite.push(subItem)))
  const isEmpty = typeof data?.[0]?.total !== 'undefined' ? total === 0 || dataInfinite?.length === 0 : false
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined') || false
  const isRefreshing = (isValidating && data && data.length === size) || false
  const isReachingEnd =
    isEmpty || dataInfinite?.length === total || (data && data[data.length - 1]?.list?.length < limit) || false
  const hasFirstFetching = !!data

  return {
    dataInfinite,
    data,
    page: size,
    loadMore: () => {
      if (!isLoadingMore) {
        setSize((prevSize) => prevSize + 1)
      }
    },
    isValidating,
    isLoadingMore,
    isEmpty,
    isRefreshing,
    isReachingEnd,
    hasFirstFetching,
    error,
    refresh: () => mutate(),
    clear: () => setSize(0),
    totalItems: total,
  }
}

export default useApiInfinite
