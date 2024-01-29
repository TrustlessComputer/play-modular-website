import qs from 'query-string'

import { API_URL } from '@/constant/constant'
import createAxiosInstance from '@/services/http-client'
import { camelCaseKeys, snakeCaseKeys } from '@/utils/normalize'
import { ICreateProjectResponse, IGetProjectDetailResponse } from '@/interface/api/generative'

export const apiClient = createAxiosInstance({ baseURL: API_URL })

const MODULAR_API_PATH = 'modular/inscriptions'
const MODULAT_WORKSHOP_API_PATH = 'modular-workshop'

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
export const getListSavedProject = async (payload: {
  ownerAddress: string
  page: number
  limit: number
}): Promise<unknown> => {
  try {
    const query = qs.stringify(snakeCaseKeys(payload))
    const res = (await apiClient.get(`${MODULAT_WORKSHOP_API_PATH}/list?${query}`)) as any
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

// export const getSavedProject = async (payload: {}): Promise<unknown> => {}

// export const saveNewProject = async (payload: {
//   name: string
//   owner_addr: string
//   meta_data: string
// }): Promise<any> => {
//   try {
//     const res = (await apiClient.post(`${MODULAT_WORKSHOP_API_PATH}/save`, payload)) as any
//     return res
//   } catch (err: unknown) {
//     throw err
//   }
// }

export const createOrSaveProject = async (payload: {
  id?: string
  name: string
  owner_addr: string
  meta_data: string
}): Promise<unknown> => {
  try {
    const res = (await apiClient.post(`${MODULAT_WORKSHOP_API_PATH}/save`, payload)) as any
    return res.valueOf()
  } catch (err: unknown) {
    throw err
  }
}

export const getProjectDetail = async (payload: { id: string }): Promise<IGetProjectDetailResponse> => {
  try {
    const res = (await apiClient.get(`${MODULAT_WORKSHOP_API_PATH}/detail?id=${payload.id}`)) as any
    return Object(camelCaseKeys(res))
  } catch (err: unknown) {
    throw err
  }
}
