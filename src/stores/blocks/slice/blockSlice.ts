'use client'

import { TBlockSlice } from '@/types/store'
import { StateCreator } from 'zustand'
import { TBlockData } from '@/types'

export const createBlocksSlice: StateCreator<TBlockSlice> = (set, get) => ({
  blockCurrent: [],
  blocksState: [[]],
  currentStateIndex: 0,
  isUndo: false,
  isRedo: false,
  bricks: [],
  selectedBricks: [],
  listCurrent: [],

  setDataCurrent: (data) =>
    set(() => {
      return {
        listCurrent: data,
      }
    }),
  addBlocks: (getBrick) =>
    set((state) => {
      const groupIdCurrent = getBrick.groupId
      const { inscriptionId, listCurrent } = get().sliceListCurrent(groupIdCurrent, state.listCurrent)
      if (inscriptionId) {
        const currentStateIndex = state.currentStateIndex
        const stateCurrent = state.blocksState[currentStateIndex] || []
        const newState = [...stateCurrent, { ...getBrick, inscriptionId }]

        if (currentStateIndex >= 10) {
          const blocksState = [...state.blocksState.slice(1), newState]
          return {
            blocksState,
            currentStateIndex: blocksState.length - 1,
            blockCurrent: newState,
            listCurrent: listCurrent,
          }
        } else {
          const blocksState = [...state.blocksState.slice(0, currentStateIndex + 1), newState]
          return {
            blocksState,
            currentStateIndex: blocksState.length - 1,
            blockCurrent: newState,
            listCurrent: listCurrent,
          }
        }
      } else {
        return state
      }
    }),
  sliceListCurrent: (groupId: string, listCurrent) => {
    const listDataCurrent = [...listCurrent]
    const idGroup = listDataCurrent.findIndex((item) => item.groupId === groupId)
    const newList = []
    let inscriptionId: string
    if (idGroup !== -1) {
      for (let i = 0; i < listDataCurrent.length; i++) {
        if (i === idGroup) {
          inscriptionId = listDataCurrent[i].items.pop()
        }
        newList.push(listDataCurrent[i])
      }
      return {
        listCurrent: newList,
        inscriptionId: inscriptionId,
      }
    }
  },
  pushListCurrent: (inscriptionID, groupId, listCurrent) => {
    const listDataCurrent = [...listCurrent]
    const idGroup = listDataCurrent.findIndex((item) => item.groupId === groupId)
    const newListPush = []
    for (let i = 0; i < listDataCurrent.length; i++) {
      if (i === idGroup) {
        listDataCurrent[i].items.push(inscriptionID)
      }
      newListPush.push(listDataCurrent[i])
    }
    return {
      listCurrent: newListPush,
    }
  },

  setBlockCurrent: (data) =>
    set(() => {
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
        const prevBlocks = state.blocksState[prevStateIndex]
        const lastBlocks = prevBlocks[prevBlocks.length - 1]
        const groupIdLastItem = lastBlocks.groupId
        const inscriptionIdLastItem = lastBlocks.inscriptionId
        const listCurrentPrev = state.listCurrent
        const { listCurrent } = get().pushListCurrent(inscriptionIdLastItem, groupIdLastItem, listCurrentPrev)
        return {
          currentStateIndex: prevStateIndex - 1,
          blockCurrent: state.blocksState[prevStateIndex - 1],
          listCurrent: listCurrent,
        }
      } else {
        return { state, isUndo: false }
      }
    }),

  redo: () =>
    set((state) => {
      let nextStateIndex = state.currentStateIndex
      if (nextStateIndex < state.blocksState.length - 1) {
        const nextBlocks = state.blocksState[nextStateIndex + 1]
        const lastBlocks = nextBlocks[nextBlocks.length - 1]
        const groupIdLastItem = lastBlocks.groupId
        const listCurrentNext = state.listCurrent
        const { listCurrent } = get().sliceListCurrent(groupIdLastItem, listCurrentNext)

        return {
          currentStateIndex: nextStateIndex + 1,
          blockCurrent: state.blocksState[nextStateIndex + 1],
          listCurrent: listCurrent,
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

  deleteSelected: (objectArray) => set((state) => {
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
  setBlockCurrentUpdate: (blocks) => set((state) => {
    const currentStateIndex = state.currentStateIndex
    // const stateCurrent = state.blocksState[currentStateIndex] || []
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
