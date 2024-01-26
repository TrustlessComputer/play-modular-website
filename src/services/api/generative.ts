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

// Save actions
export const getListSavedProject = async (payload: {}): Promise<unknown> => {}

export const getSavedProject = async (payload: {}): Promise<unknown> => {}

export const createNewProject = async (payload: {}): Promise<unknown> => {}

export const saveProject = async (payload: { id: string; jsonFile: string }): Promise<unknown> => {
  try {
    const res = (await apiClient.post(`save`, payload)) as any
    return res
  } catch (err: unknown) {
    return err
  }
}
