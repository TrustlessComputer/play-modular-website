import { createProjectSlice } from './slice/projectSlice'
import create from 'zustand'
import { createBlocksSlice } from './slice/blockSlice'
import { createTraitBlockSlice } from './slice/traitBlockSlice'
import { createPreviewSlice } from './slice/previewSlice'
import { createCreatedBricksSlice } from './slice/createdBricksSlice'
import {
  TAtributeBlock,
  TBlockSlice,
  TCreatedBrickSlice,
  TListBlocksSlice,
  TPreviewSlice,
  TProjectSlice,
} from '@/types/store'
import { createListBlocks } from './slice/listBlocksSlice'

export const useStoreGlobal = create<
  TBlockSlice & TPreviewSlice & TAtributeBlock & TListBlocksSlice & TCreatedBrickSlice
>((...a) => ({
  ...createBlocksSlice(...a),
  ...createTraitBlockSlice(...a),
  ...createPreviewSlice(...a),
  ...createListBlocks(...a),
  ...createCreatedBricksSlice(...a),
}))

export const useProjectStore = create<TProjectSlice>((...a) => ({
  ...createProjectSlice(...a),
}))
