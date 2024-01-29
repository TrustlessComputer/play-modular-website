'use client'

import { TBlockSlice } from '@/types/store'
import { StateCreator } from 'zustand'

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
          console.log( {
            blocksState,
            currentStateIndex: blocksState.length - 1,
            blockCurrent: newState,
            listCurrent: listCurrent,
          })
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
    set((state) => {
      const listCurrentData = [...state.listCurrent]
      for (let i = 0; i < data.length; i++) {
        const groupId = data[i].groupId
        const outputString = groupId.replace(/modular's/g, '')
        const inscriptionId = data[i].inscriptionId
        for (let j = 0; j < listCurrentData.length; j++) {
          const itemInscription = listCurrentData[j].items
          if (listCurrentData[j].groupId === outputString) {
            for (let k = 0; k < itemInscription.length; k++) {
              if (inscriptionId === itemInscription[k]) {
                itemInscription.splice(k, 1)
                k--
              }
            }
          }
        }
      }
      return { blockCurrent: data, blocksState: [data], currentStateIndex: 0, listCurrent: listCurrentData }
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

  deleteSelected: (selectedBricks) => set((state) => {
    const currentStateIndex = state.currentStateIndex
    const stateCurrent = state.blocksState[currentStateIndex] || []
    const blockCurrentCopy = [...stateCurrent]

    for (let i = 0; i < selectedBricks.length; i++) {
      for (let j = 0; j < blockCurrentCopy.length; j++) {
        if(selectedBricks[i].userData.uID == blockCurrentCopy[j].uID) {
          blockCurrentCopy.splice(j, 1)
        }
      }
    }

    const blocksState = [...state.blocksState , blockCurrentCopy]


    return {
      blocksState,
      currentStateIndex: blocksState.length - 1,
      blockCurrent: blockCurrentCopy,
    }
  }),
  setBlockCurrentUpdate: (blocks) =>  set((state) => {
    const currentStateIndex = state.currentStateIndex + 1
    return { blockCurrent: blocks, blocksState: [blocks], currentStateIndex }
  }),
  setBricks: (getBricks) =>
    set((state) => ({ blockCurrent: getBricks(state.blockCurrent) })),
})
