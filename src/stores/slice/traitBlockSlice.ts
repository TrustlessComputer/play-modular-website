import { TAtributeBlock } from '@/types/store'
import { CREATE_MODE, defaultAnchor, defaultWidth } from '../../utils'
import { colors } from '../../utils'
import { StateCreator } from 'zustand'

export const createTraitBlockSlice: StateCreator<TAtributeBlock> = (set) => ({
    mode: CREATE_MODE,
    width: defaultWidth,
    depth: defaultWidth,
    height: defaultWidth,
    anchorX: defaultAnchor,
    anchorZ: defaultAnchor,
    anchorY: defaultAnchor,
    rotate: false,
    color: colors[Math.floor(Math.random() * colors.length - 1)],
    texture: 'assets/patterns/sand.svg',
    trait: { color: '#ff0000', texture: 'assets/patterns/sand.svg', shape: '1x1' },

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
    setTrait: ({ color, texture, shape }) =>
        set({
            trait: { color: color, texture: texture, shape: shape },
        }),
})
