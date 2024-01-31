import { useStoreGlobal } from '@/stores/blocks'
import useKeyboardShortcut from 'use-keyboard-shortcut'

export const useAnchorShorcuts = () => {
    const { setAnchorZ, setAnchorX } = useStoreGlobal()

    const anchorXPlus = () => {
        setAnchorX(useStoreGlobal.getState().anchorX + 1)
    }

    const anchorXMinus = () => {
        setAnchorX(useStoreGlobal.getState().anchorX - 1)
    }

    const anchorZPlus = () => {
        setAnchorZ(useStoreGlobal.getState().anchorZ + 1)
    }

    const anchorZMinus = () => {
        setAnchorZ(useStoreGlobal.getState().anchorZ - 1)
    }

    useKeyboardShortcut(['D'], anchorXPlus, {
        overrideSystem: true,
        ignoreInputFields: true,
        repeatOnHold: false,
    })

    useKeyboardShortcut(['A'], anchorXMinus, {
        overrideSystem: true,
        ignoreInputFields: true,
        repeatOnHold: false,
    })

    useKeyboardShortcut(['W'], anchorZPlus, {
        overrideSystem: true,
        ignoreInputFields: true,
        repeatOnHold: false,
    })

    useKeyboardShortcut(['S'], anchorZMinus, {
        overrideSystem: true,
        ignoreInputFields: true,
        repeatOnHold: false,
    })

    return null
}

export const useUndoRedoShortcut = (undo: () => void, redo: () => void) => {
    useKeyboardShortcut(['Control', 'Z'], undo, {
        overrideSystem: true,
        ignoreInputFields: true,
        repeatOnHold: false,
    })

    useKeyboardShortcut(['Control', 'Y'], redo, {
        overrideSystem: true,
        ignoreInputFields: true,
        repeatOnHold: false,
    })

    return null
}

export const useDeleteShortcut = (onDelete: () => void) => {
    useKeyboardShortcut(['Delete'], onDelete, {
        overrideSystem: true,
        ignoreInputFields: true,
        repeatOnHold: false,
    })

    return null
}
