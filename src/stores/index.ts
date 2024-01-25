import create from 'zustand'
import { createBlocksSlice } from './slice/blockSlice'
import { createTraitBlockSlice } from './slice/traitBlockSlice'
import { createPreviewSlice } from './slice/previewSlice'
import { TAtributeBlock, TBlockSlice, TPreviewSlice } from '@/types/store'

export const useStoreGlobal = create<TBlockSlice & TPreviewSlice & TAtributeBlock>((...a) => ({
  ...createBlocksSlice(...a),
  ...createTraitBlockSlice(...a),
  ...createPreviewSlice(...a),
}))
