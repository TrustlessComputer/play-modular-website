import { TCreatedBrickSlice } from '@/types/store'
import { StateCreator } from 'zustand'

export const createBlocksSlice: StateCreator<TCreatedBrickSlice> = (set) => ({
  createdBricks: [],
  setCreatedBricks: (createdBricks) => set((state) => ({ createdBricks: [...state.createdBricks, createdBricks] })),
})
