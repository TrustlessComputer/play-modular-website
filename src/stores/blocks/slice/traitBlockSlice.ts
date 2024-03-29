import { NONT_TEXTURE } from '@/constant/trait-data'
import { TAtributeBlock } from '@/types/store'
import { CREATE_MODE, EDIT_MODE, defaultAnchor, defaultWidth } from '@/utils'
import { StateCreator } from 'zustand'

export const createTraitBlockSlice: StateCreator<TAtributeBlock> = (set) => ({
  mode: CREATE_MODE,
  width: 2,
  depth: 2,
  height: defaultWidth,
  anchorX: defaultAnchor,
  anchorZ: defaultAnchor,
  anchorY: defaultAnchor,
  rotate: false,
  color: '',
  texture: NONT_TEXTURE,
  trait: { color: '', texture: NONT_TEXTURE, shape: '', type: '', groupId: '' },
  setMode: (newMode) => set({ mode: newMode }),
  setWidth: (newWidth) => set({ width: newWidth }),
  setDepth: (newDepth) => set({ depth: newDepth }),
  setHeight: (newHeight) => set({ height: newHeight }),
  setAnchorX: (newAnchorPoint) => set({ anchorX: newAnchorPoint }),
  setAnchorZ: (newAnchorPoint) => set({ anchorZ: newAnchorPoint }),
  setAnchorY: (newAnchorPoint) => set({ anchorY: newAnchorPoint }),
  setRotate: (bool) => set({ rotate: bool }),
  setColor: (newColor) => set({ color: newColor }),
  setTexture: (texture) => set({ texture: texture }),
  setTrait: ({ color, texture, shape, type, groupId }) =>
    set({
      trait: { color: color, texture: texture, shape: shape, type: type, groupId: groupId },
    }),
  // setSelectedBricks: (b: any) => set((state) => state),
})
