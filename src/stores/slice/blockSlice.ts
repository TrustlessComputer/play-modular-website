import { TBlockSlice } from '@/types/store'
import { StateCreator } from 'zustand'

export const createBlocksSlice: StateCreator<TBlockSlice> = (set) => ({
  blockCurrent: [],
  blocksState: [[]],
  currentStateIndex: 0,
  isUndo: false,
  isRedo: false,
  selectedBricks: [],
  addBlocks: (getBrick) =>
    set((state) => {
      const currentStateIndex = state.currentStateIndex
      const stateCurrent = state.blocksState[currentStateIndex] || []
      const newState = [...stateCurrent, getBrick]
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
      else if (Array.isArray(object)) return { selectedBricks: object }
      else if (!shift) return state.selectedBricks[0] === object ? { selectedBricks: [] } : { selectedBricks: [object] }
      else if (state.selectedBricks.includes(object))
        return {
          selectedBricks: state.selectedBricks.filter((o) => o !== object),
        }
      else return { selectedBricks: [object, ...state.selectedBricks] }
    }),
  setBricks: (getBricks) => set((state) => state),
})
