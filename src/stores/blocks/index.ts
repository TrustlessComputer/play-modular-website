import { createProjectSlice } from './slice/projectSlice'
import create from 'zustand'
import { createBlocksSlice } from './slice/blockSlice'
import { createTraitBlockSlice } from './slice/traitBlockSlice'
import { createPreviewSlice } from './slice/previewSlice'
import { createCreatedBricksSlice } from './slice/createdBricksSlice'
import { TAtributeBlock, TBlockSlice, TCreatedBrickSlice, TPreviewSlice, TProjectSlice } from '@/types/store'

export const useStoreGlobal = create<TBlockSlice & TPreviewSlice & TAtributeBlock & TCreatedBrickSlice>((...a) => ({
  ...createBlocksSlice(...a),
  ...createTraitBlockSlice(...a),
  ...createPreviewSlice(...a),
  ...createCreatedBricksSlice(...a),
}))

export const useProjectStore = create<TProjectSlice>((...a) => ({
  ...createProjectSlice(...a),
}))
