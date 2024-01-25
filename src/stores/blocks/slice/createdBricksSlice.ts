import { TCreatedBrickSlice } from '@/types/store'
import { StateCreator } from 'zustand'

export const createCreatedBricksSlice: StateCreator<TCreatedBrickSlice> = (set) => ({
  createdBricks: {},
  setCreatedBricks: (createdBricks) =>
    set((state) => ({
      createdBricks: {
        ...state.createdBricks,
        [createdBricks.patterns[0]]: createdBricks,
      },
    })),
})
