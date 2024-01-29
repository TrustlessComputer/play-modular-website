import { createBlocksSlice } from './slice/blockSlice'
import { createModalSlice } from './slice/modalSlice'
import { createProjectSlice } from './slice/projectSlice'
import create from 'zustand'
import { createTraitBlockSlice } from './slice/traitBlockSlice'
import { createPreviewSlice } from './slice/previewSlice'
import { createCreatedBricksSlice } from './slice/createdBricksSlice'
import { createDragSlice } from './slice/dragSlice'
import {
  TAtributeBlock,
  TBlockSlice,
  TCreatedBrickSlice,
  TDragSlice,
  TListBlocksSlice,
  TPreviewSlice,
  TProjectSlice,
  TModalSlice,
} from '@/types/store'
import { createListBlocks } from './slice/listBlocksSlice'

export const useStoreGlobal = create<
  TBlockSlice & TPreviewSlice & TAtributeBlock & TListBlocksSlice & TCreatedBrickSlice & TDragSlice
>((...a) => ({
  ...createBlocksSlice(...a),
  ...createTraitBlockSlice(...a),
  ...createPreviewSlice(...a),
  ...createListBlocks(...a),
  ...createCreatedBricksSlice(...a),
  ...createDragSlice(...a),
}))

export const useProjectStore = create<TProjectSlice>((...a) => ({
  ...createProjectSlice(...a),
}))

export const useModalStore = create<TModalSlice>((...a) => ({
  ...createModalSlice(...a),
}))
