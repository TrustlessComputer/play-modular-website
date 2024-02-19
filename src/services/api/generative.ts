'use client'

import qs from 'query-string'

import { API_URL } from '@/constant/constant'
import { IGetProjectDetailResponse, IUploadFile, UploadFileResponse } from '@/interface/api/generative'
import createAxiosInstance from '@/services/http-client'
import { TListCurrent } from '@/types'
import { camelCaseKeys, snakeCaseKeys } from '@/utils/normalize'
import { isLocalhost } from '@/utils/browser'
import { MOCK_ADDRESS } from '@/constant/mock-data'

export const apiClient = createAxiosInstance({ baseURL: API_URL })

const MODULAR_API_PATH = 'modular/inscriptions'
const MODULAT_WORKSHOP_API_PATH = 'modular-workshop'

export const getListModularByWallet = async (payload: {
  ownerAddress: string
  page: number
  limit: number
}): Promise<unknown> => {
  try {
    const query = qs.stringify(snakeCaseKeys({ ...payload, limit: 100 })) // hardcode limit 100 items
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
  address: string
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
export const handleGetData = async (address: string) => {
  const data = (await getListModularByWallet({
    // ownerAddress: address,
    // ownerAddress: address, // 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn',
    ownerAddress: isLocalhost() ? MOCK_ADDRESS : address,

    page: 1,
    // limit: 100,
    limit: 1000,
  })) as any
  const listData = data.list as TListCurrent[]
  return listData
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
  thumbnail: string
  is_guest_mode?: boolean
}): Promise<string> => {
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

export const uploadFile = async (payload: IUploadFile): Promise<UploadFileResponse> => {
  const formData = new FormData()
  formData.append('file', payload.file)
  const res = await apiClient.post(`/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return camelCaseKeys(res)
}
