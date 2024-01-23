import { TBlockData } from '@/types'
import { TBlockSlice } from '@/types/store'
import { StateCreator } from 'zustand'

export const createBlocksSlice: StateCreator<TBlockSlice> = (set) => ({
    blockCurrent: [],
    blocksState: [[]],
    currentStateIndex: 0,
    isUndo: false,
    isRedo: false,

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
    // setBricks: (getBricks) => set((state) => ({ blockCurrent: getBricks(state.blockCurrent) })),
})
