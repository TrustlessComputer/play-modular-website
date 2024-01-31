import { TDragSlice } from '@/types/store'
import { StateCreator } from 'zustand'

export const createDragSlice: StateCreator<TDragSlice> = (set) => ({
  isDragging: false,
  setIsDragging: (isDragging) => set(() => ({ isDragging })),
})
