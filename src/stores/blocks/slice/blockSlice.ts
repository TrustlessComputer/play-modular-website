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
      console.log('state.blocksState', state.blocksState)
      console.log('currentStateIndex: ', state.currentStateIndex)

      const currentStateIndex = state.currentStateIndex
      const stateCurrent = state.blocksState[currentStateIndex] || []
      const newState = [...stateCurrent, getBrick]

      if (currentStateIndex >= 10) {
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
  // deleteSeletBlocks: () =>
  //   set((state) => {
  //     console.log(state.selectedBricks)
  //     return {
  //       state,
  //     }
  //   }),
  setBlockCurrent: (data) =>
    set((state) => {
      return { blockCurrent: data, blocksState: [data], currentStateIndex: 0 }
    }),
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
      console.log(object)

      if (object === undefined) return { selectedBricks: [] }

      if (Array.isArray(object)) return { selectedBricks: object }

      if (!shift) return state.selectedBricks[0] === object ? { selectedBricks: [] } : { selectedBricks: [object] }

      if (state.selectedBricks.includes(object))
        return {
          selectedBricks: state.selectedBricks.filter((o) => o !== object),
        }

      return { selectedBricks: [object, ...state.selectedBricks] }
    }),

  deleteSelected: (objectArray) => set ((state) => {
    console.log('objectArray', objectArray)
    const currentStateIndex = state.currentStateIndex
    const stateCurrent = state.blocksState[currentStateIndex] || []
    // const selectedClone = [...objectArray];

    console.log('selectedClone', objectArray)
    const deleteBricks = stateCurrent.filter((brick) => {
      const uID = brick.uID;
      let should = true;
      for (let i = 0; i < objectArray.length; i++) {
        const selectedUID = objectArray[i].userData.uID;
        if (uID === selectedUID) {
          console.log('runnnnn', uID)
          should = false;
          objectArray.splice(i, 1);
        }
      }
      return should;
    });
    const blocksState = [...state.blocksState.slice(0, currentStateIndex + 1), deleteBricks]

    console.log('newBricks', deleteBricks)


    return {
      blocksState,
      currentStateIndex: blocksState.length + 1,
      blockCurrent: deleteBricks,
    }
  }),
  setBlockCurrentUpdate: (blocks) => set((state)  => {
    const currentStateIndex = state.currentStateIndex
    const stateCurrent = state.blocksState[currentStateIndex] || []
    const newState = blocks

    if (currentStateIndex >= 10) {
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
  setBricks: (getBricks) =>
    set((state) => ({ blockCurrent: getBricks(state.blockCurrent) })),
})
