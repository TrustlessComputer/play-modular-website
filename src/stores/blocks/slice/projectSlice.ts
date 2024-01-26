import { createNewProject, saveProject } from '@/services/api/generative'
import { TProjectSlice } from '@/types/store'
import toast from 'react-hot-toast'
import { StateCreator } from 'zustand'

export const createProjectSlice: StateCreator<TProjectSlice> = (set) => ({
  projectName: '',
  projectId: '',
  saveProject: async (params) => {
    const { projectId, projectName, jsonFile } = params

    try {
      const res = await saveProject({
        id: projectId, // get from BE or auto generate
        name: projectName,
        jsonFile: JSON.stringify(jsonFile),
      })
      if (res) {
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
  createProject: async () => {
    // call API to create project
    try {
      const res: any = await createNewProject()
      if (res) {
        set({ projectId: res?.id, projectName: res?.name })
      }
    } catch (error) {
      //
    }
  },
})
