import { MOCK_ADDRESS } from '@/constant/mock-data'
import { createOrSaveProject } from '@/services/api/generative'
import { TProjectSlice } from '@/types/store'
import toast from 'react-hot-toast'
import { StateCreator } from 'zustand'

export const createProjectSlice: StateCreator<TProjectSlice> = (set) => ({
  projectName: '',
  projectId: '',
  saveProject: async (params) => {
    const { projectId, projectName, jsonFile, ownerAddress } = params

    const name = projectName || new Date().toISOString()

    const payload = {
      name,
      owner_addr: ownerAddress,
      meta_data: JSON.stringify(jsonFile),
    }

    if (projectId) {
      payload['id'] = projectId
    }

    try {
      const res = await createOrSaveProject(payload)
      if (res) {
        set({ projectId: res as string, projectName: name })
        toast.success('Saved successfully!')
      }
    } catch (error) {
      toast.error('Something went wrong! Please try again!')
      throw error
    }

    // call API to save project
  },
  saveAsProject: (params) => {
    const { projectId, projectName } = params
    // call API to save project
  },
  loadProject: (params) => {
    const { projectId, projectName } = params
    // import json file here to render

    set({ projectId, projectName })
  },
  createProject: () => {
    // call API to create project
    set({ projectId: '', projectName: '' })
  },
})
