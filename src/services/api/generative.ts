import qs from 'query-string'

import { API_URL } from '@/constant/constant'
import createAxiosInstance from '@/services/http-client'
import { snakeCaseKeys } from '@/utils/normalize'

export const apiClient = createAxiosInstance({ baseURL: API_URL })

const MODULAR_API_PATH = 'modular/inscriptions'

export const getListModularByWallet = async (payload: {
  ownerAddress: string
  page: number
  limit: number
}): Promise<unknown> => {
  try {
    const query = qs.stringify(snakeCaseKeys(payload))
    const res = (await apiClient.get(`${MODULAR_API_PATH}?${query}`)) as any
    return {
      list: res?.result || [],
      total: res?.total || 0,
    }
  } catch (err: unknown) {
    return {
      list: [],
      total: 0,
    }
  }
}
