import { TPreviewSlice } from '@/types/store'
import { views } from '@/utils'
import { StateCreator } from 'zustand'

export const createPreviewSlice: StateCreator<TPreviewSlice> = (set) => ({
  view: views.Isometric,
  viewPreview: false,

  setViewPreview: (bool: boolean) => set({ viewPreview: bool }),
  setView: (view) => set({ view: view }),
})
