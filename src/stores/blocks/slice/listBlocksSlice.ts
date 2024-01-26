import { TBlockSlice, TListBlocksSlice } from '@/types/store'
import { StateCreator } from 'zustand'

export const createListBlocks: StateCreator<TListBlocksSlice> = (set) => ({
    listCurrent: [],
    setDataCurrent: (data) =>
        set((state) => {
            // const itemCurrent = state.listCurrent.filter((item) => item.id === id)
            // console.log('itemCurrent', itemCurrent)
            return {
                listCurrent: data,
            }
        }),
})
