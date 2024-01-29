import { MOCK_ADDRESS } from '@/constant/mock-data'
import { createOrSaveProject } from '@/services/api/generative'
import { TProjectSlice } from '@/types/store'
import toast from 'react-hot-toast'
import { StateCreator } from 'zustand'

export const createProjectSlice: StateCreator<TProjectSlice> = (set) => ({
  projectName: '',
  projectId: '',
  renderFile: '',
  selectedProject: {
    id: '',
    name: '',
  },

  saveProject: async (params) => {
    const { projectId, projectName, jsonFile, ownerAddress } = params

    const name = projectName || `${new Date().getTime()}`

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
        return 'success'
      }
    } catch (error) {
      toast.error('Something went wrong! Please try again!')
      return 'failed'
    }

    // call API to save project
  },
  
  loadProject: (params) => {
    const { projectId, projectName, renderFile } = params

    set({ projectId, projectName, renderFile })
  },
  createProject: () => {
    // call API to create project
    set({ projectId: '', projectName: '', renderFile: ''})
  },
  setSelectedProject: (params) => {
    const { id, name } = params
    set({ selectedProject: { id, name } })
  }
})
