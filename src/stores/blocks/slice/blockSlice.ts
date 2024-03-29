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
  setPositionBricks: (data) => {
    set((state) => {
      const currentIndex = state.currentStateIndex
      const blocksStateUpdate = [...state.blocksState, data]
      return {
        blockCurrent: data,
        currentStateIndex: currentIndex + 1,
        blocksState: blocksStateUpdate,
      }
    })
  },
  addBlocks: (getBrick) =>
    set((state) => {
      const groupIdCurrent = getBrick.groupId
      const { inscriptionId } = get().sliceListCurrent(groupIdCurrent, state.listCurrent)
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
          }
        } else {
          const blocksState = [...state.blocksState.slice(0, currentStateIndex + 1), newState]
          return {
            blocksState,
            currentStateIndex: blocksState.length - 1,
            blockCurrent: newState,
          }
        }
      } else {
        return state
      }
    }),
  deleteSelected: (selectedBricks) =>
    set((state) => {
      const currentStateIndex = state.currentStateIndex
      const stateCurrent = state.blocksState[currentStateIndex] || []
      const blockCurrentCopy = [...stateCurrent]

      const listCurrent = state.listCurrent
      for (let i = 0; i < selectedBricks.length; i++) {
        for (let j = 0; j < blockCurrentCopy.length; j++) {
          if (selectedBricks[i].userData.uID == blockCurrentCopy[j].uID) {
            const inscriptionID = blockCurrentCopy[j].inscriptionId
            const groupId = blockCurrentCopy[j].groupId
            get().pushListCurrent(inscriptionID, groupId, listCurrent)
            blockCurrentCopy.splice(j, 1)
          }
        }
      }
      const blocksState = [...state.blocksState, blockCurrentCopy]

      return {
        blocksState,
        currentStateIndex: blocksState.length - 1,
        blockCurrent: blockCurrentCopy,
      }
    }),

  sliceListCurrent: (groupId: string, listCurrent) => {
    const listDataCurrent = [...listCurrent]
    const idGroup = listDataCurrent.findIndex((item) => item.groupId === groupId)
    const newList = []
    let inscriptionId: string
    if (idGroup !== -1) {
      for (let i = 0; i < listCurrent.length; i++) {
        if (listCurrent[i].groupId === groupId) {
          inscriptionId = listCurrent[i].items.pop()
          // listDataCurrent[i].items.splice(i, 1)
          if (listCurrent[i].items.indexOf(inscriptionId) !== -1) {
            // console.log('test ________')
            listCurrent[i].items.splice(i, 1)
          }
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
      const isHaventInList = listDataCurrent[i].items.indexOf(inscriptionID) === -1
      if (i === idGroup && isHaventInList) {
        listDataCurrent[i].items.push(inscriptionID)
      }
      newListPush.push(listDataCurrent[i])
    }
    return {
      listCurrent: newListPush,
    }
  },
  pushMultiListCurrent: (blockCurrent, listCurrent) => {
    const newListCurrent = [...listCurrent]
    const newBlocksCurrent = [...blockCurrent]
    for (let i = 0; i < newBlocksCurrent.length; i++) {
      const groupId = newBlocksCurrent[i].groupId
      const inscriptionId = newBlocksCurrent[i].inscriptionId
      for (let j = 0; j < newListCurrent.length; j++) {
        const groupListId = newListCurrent[j].groupId
        const isHaventInList = newListCurrent[j].items.indexOf(inscriptionId) === -1
        if (groupId === groupListId && isHaventInList) {
          newListCurrent[j].items.push(inscriptionId)
        }
      }
    }
    return newListCurrent
  },
  sliceMultiListCurrent: (blockCurrent, listCurrent) => {
    const newListCurrent = [...listCurrent]
    const newBlocksCurrent = [...blockCurrent]
    for (let i = 0; i < newBlocksCurrent.length; i++) {
      const groupId = newBlocksCurrent[i].groupId
      const inscriptionId = newBlocksCurrent[i].inscriptionId
      for (let j = 0; j < newListCurrent.length; j++) {
        const groupListId = newListCurrent[j].groupId
        const indexInscriptionId = newListCurrent[j].items.findIndex((item) => item === inscriptionId)
        if (groupId === groupListId) {
          newListCurrent[j].items.splice(indexInscriptionId, 1)
        }
      }
    }
    return newListCurrent
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
      const blockCurrent = state.blockCurrent
      if (blockCurrent.length > 0) {
        const listCurrent = state.listCurrent
        get().pushMultiListCurrent(blockCurrent, listCurrent)
        return {
          blocksState,
          currentStateIndex: blocksState.length - 1,
          blockCurrent: newState,
        }
      } else {
        return state
      }
    }),
  undo: () =>
    set((state) => {
      let prevStateIndex = state.currentStateIndex
      if (prevStateIndex > 0) {
        const blocksCurrent = state.blocksState[prevStateIndex]
        const prevListBlocks = [...state.blocksState[prevStateIndex - 1]]
        const difference = Math.abs(blocksCurrent.length - prevListBlocks.length)
        const listCurrentPrev = state.listCurrent

        if (difference >= 2) {
          const newArr = prevListBlocks.filter((item) => !blocksCurrent.includes(item))
          get().sliceMultiListCurrent(newArr, listCurrentPrev)
        } else if (blocksCurrent.length > prevListBlocks.length) {
          const lastBlocks = blocksCurrent[blocksCurrent.length - 1]
          const groupIdLastItem = lastBlocks.groupId
          const inscriptionIdLastItem = lastBlocks.inscriptionId
          get().pushListCurrent(inscriptionIdLastItem, groupIdLastItem, listCurrentPrev)
        } else if (blocksCurrent.length < prevListBlocks.length) {
          const prevBlocks = state.blocksState[prevStateIndex - 1]
          const lastBlocks = prevBlocks[prevBlocks.length - 1]
          const groupIdLastItem = lastBlocks?.groupId
          get().sliceListCurrent(groupIdLastItem, listCurrentPrev)
        }
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
        const blocksCurrent = state.blocksState[nextStateIndex]
        const nextBlocks = state.blocksState[nextStateIndex + 1]
        const difference = Math.abs(blocksCurrent.length - nextBlocks.length)
        const listCurrent = state.listCurrent
        if (difference >= 2) {
          const newArr = blocksCurrent.filter((item) => !nextBlocks.includes(item))
          get().pushMultiListCurrent(newArr, listCurrent)
        } else if (blocksCurrent.length < nextBlocks.length) {
          console.log('redocase1')
          const lastBlocks = nextBlocks[nextBlocks.length - 1]
          const groupIdLastItem = lastBlocks?.groupId
          get().sliceListCurrent(groupIdLastItem, listCurrent)
        } else if (blocksCurrent.length > nextBlocks.length) {
          console.log('redocase2')
          const prevBlocks = blocksCurrent[blocksCurrent.length - 1]
          const groupIdLastItem = prevBlocks.groupId
          const inscriptionIdLastItem = prevBlocks.inscriptionId
          get().pushListCurrent(inscriptionIdLastItem, groupIdLastItem, listCurrent)
        }
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

  setBlockCurrentUpdate: (blocks) =>
    set((state) => {
      const currentStateIndex = state.currentStateIndex + 1
      return { blockCurrent: blocks, blocksState: [blocks], currentStateIndex }
    }),
  setBricks: (getBricks) => set((state) => ({ blockCurrent: getBricks(state.blockCurrent) })),
})
