'use client'

import { TBlockSlice, TListBlocksSlice } from '@/types/store'
import { StateCreator } from 'zustand'
import { TBlockData } from '@/types'

export const createBlocksSlice: StateCreator<TBlockSlice> = (set) => ({
  blockCurrent: [],
  blocksState: [[]],
  currentStateIndex: 0,
  isUndo: false,
  isRedo: false,
  bricks: [],
  selectedBricks: [],
  addBlocks: (getBrick) =>
    set((state) => {
      const currentStateIndex = state.currentStateIndex
      const stateCurrent = state.blocksState[currentStateIndex] || []
      const newState = [...stateCurrent, getBrick]

      if (currentStateIndex >= 40) {
        const blocksState = [...state.blocksState.slice(1), newState]
        return {
          blocksState,
          currentStateIndex: blocksState.length - 1,
          blockCurrent: newState,
        }
      } else {
        const blocksState = [...state.blocksState.slice(0, currentStateIndex + 1), newState]
        return {
          blocksState,
          currentStateIndex: blocksState.length - 1,
          blockCurrent: newState,
        }
      }
    }),
  setBlockCurrent: (data) => set(() => ({ blockCurrent: data })),
  deleteAlls: () =>
    set((state) => {
      const currentStateIndex = state.currentStateIndex
      const newState = []
      const blocksState = [...state.blocksState.slice(0, currentStateIndex + 1), newState]

      return {
        blocksState,
        currentStateIndex: blocksState.length - 1,
        blockCurrent: newState,
      }
    }),
  undo: () =>
    set((state) => {
      let prevStateIndex = state.currentStateIndex

      if (prevStateIndex > 0) {
        return {
          currentStateIndex: prevStateIndex - 1,
          blockCurrent: state.blocksState[prevStateIndex - 1],
        }
      } else {
        return { state, isUndo: false }
      }
    }),

  redo: () =>
    set((state) => {
      let nextStateIndex = state.currentStateIndex
      if (nextStateIndex < state.blocksState.length - 1) {
        return {
          currentStateIndex: nextStateIndex + 1,
          blockCurrent: state.blocksState[nextStateIndex + 1],
        }
      } else {
        return { ...state, isRedo: false }
      }
    }),
  setSelectedBricks: ({ object, shift }) =>
    set((state) => {
      if (object === undefined) return { selectedBricks: [] }

      if (Array.isArray(object)) return { selectedBricks: object }

      if (!shift) return state.selectedBricks[0] === object ? { selectedBricks: [] } : { selectedBricks: [object] }

      if (state.selectedBricks.includes(object))
        return {
          selectedBricks: state.selectedBricks.filter((o) => o !== object),
        }

      return { selectedBricks: [object, ...state.selectedBricks] }
    }),

  deleteSelected: (object) => set ((state) => {
    const currentStateIndex = state.currentStateIndex
    const stateCurrent = state.blocksState[currentStateIndex] || []
    const newState: Array<TBlockData> = [...stateCurrent]
    const selectedUID = object.userData.uID;

    let blocksState;

    for (let i = 0; i < newState.length; i++) {
      const uID = newState[i].uID;
      if (uID === selectedUID) {
        blocksState = [...newState.splice(i, 1)]
      }
    }

    return {
      blocksState,
      currentStateIndex: blocksState,
      blockCurrent: newState,
    }
  }),
  setBricks: (getBricks) => set((state) => state),
})
