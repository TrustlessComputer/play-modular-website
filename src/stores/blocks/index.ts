import create from 'zustand'
import { createBlocksSlice } from './slice/blockSlice'
import { createTraitBlockSlice } from './slice/traitBlockSlice'
import { createPreviewSlice } from './slice/previewSlice'
import { TAtributeBlock, TBlockSlice, TListBlocksSlice, TPreviewSlice } from '@/types/store'
import { createListBlocks } from './slice/listBlocksSlice'

export const useStoreGlobal = create<TBlockSlice & TPreviewSlice & TAtributeBlock & TListBlocksSlice>((...a) => ({
    ...createBlocksSlice(...a),
    ...createTraitBlockSlice(...a),
    ...createPreviewSlice(...a),
    ...createListBlocks(...a),
}))
