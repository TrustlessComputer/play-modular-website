import { TAtributeBlock } from '@/types/store'
import { CREATE_MODE, defaultAnchor, defaultWidth, colors } from '@/utils'
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
  color: '#FF4B51',
  texture: '/assets/patterns/optimic.svg',
  trait: { color: '#FF4B51', texture: '/assets/patterns/optimic.svg', shape: '2x2', type: '1' },
  selectedBricks: [],
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
  setTrait: ({ color, texture, shape, type }) =>
    set({
      trait: { color: color, texture: texture, shape: shape, type: type },
    }),
  setSelectedBricks: (b: any) => set((state) => state),
})
