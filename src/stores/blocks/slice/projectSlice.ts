import { createOrSaveProject } from '@/services/api/generative'
import { TProjectSlice } from '@/types/store'
import { id } from 'ethers'
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
  loading: false,

  setLoading: (loading) => {
    set({ loading })
  },

  saveProject: async (params) => {
    const { projectId, projectName, jsonFile, ownerAddress, thumbnail, isGuestMode } = params

    const name = projectName || `${new Date().getTime()}`

    const payload = {
      name,
      owner_addr: ownerAddress,
      meta_data: JSON.stringify(jsonFile),
      thumbnail,
      is_guest_mode: isGuestMode,
    }

    if (projectId) {
      payload['id'] = projectId
    }

    try {
      const res = await createOrSaveProject(payload)
      if (res) {
        set({ projectId: res as string, projectName: name })
        toast.success('Saved', { id: 'save-project-success' })
        return res
      }
    } catch (error) {
      toast.error('Something went wrong! Please try again!')
      return 'failed'
    } finally {
    }

    // call API to save project
  },

  loadProject: (params) => {
    const { projectId, projectName, renderFile } = params

    set({ projectId, projectName, renderFile })
  },
  createProject: () => {
    // call API to create project
    set({ projectId: '', projectName: '', renderFile: '' })
  },

  setSelectedProject: (params) => {
    const { id, name } = params
    set({ selectedProject: { id, name } })
  },
})
