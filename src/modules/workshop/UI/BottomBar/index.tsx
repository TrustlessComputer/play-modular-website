'use client'

import React from 'react'
import './styles.css'
// import { views, EDIT_MODE } from '@/utils'
import { useStoreGlobal } from '@/stores'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import { views } from '@/utils'

export default function BottomBar() {
  const { undo, redo, mode, viewPreview, setViewPreview } = useStoreGlobal()

  // const isEditMode = mode === EDIT_MODE
  // const selectedBricks = useStore((state) => state.selectedBricks).map((sel) => sel.userData.uID)
  // const setBricks = useStore((state) => state.setBricks)
  // const setSelection = useStore((state) => state.setSelectedBricks)

  // const deleteSelectedBricks = () => {
  //   setBricks((bricks) => {
  //     const newBricks = bricks.filter((brick) => {
  //       const selectedClone = [...selectedBricks]
  //       const uID = brick.uID
  //       let should = true
  //       for (let i = 0; i < selectedClone.length; i++) {
  //         const selectedUID = selectedClone[i]
  //         if (uID === selectedUID) {
  //           should = false
  //           selectedClone.splice(i, 1)
  //         }
  //       }
  //       return should
  //     })
  //     return newBricks
  //   })
  //   setSelection({})
  // }

  const undoAction = () => {
    // setSelection({});
    undo()
  }

  const redoAction = () => {
    // setSelection({});
    redo()
  }

  useUndoRedoShortcut(undo, redo)

  return (
    <div className='BottomBar'>
      <button className='Button violet' onClick={undoAction}>
        Undo
      </button>

      <button className='Button violet' onClick={redoAction}>
        Redo
      </button>

      {/* <button onClick={deleteSelectedBricks} className='Button violet'>
        Delete
      </button> */}

      <button onClick={() => setViewPreview(!viewPreview)} className='Button violet'>
        Preview
      </button>
    </div>
  )
}
const allViews = Object.values(views)

BottomBar.PreviewScene = function BottomBarPreviewScene() {
  const { view, setView } = useStoreGlobal()

  return (
    <div className='BottomBar'>
      {allViews.map((v) => (
        <button
          key={v}
          className={`Button violet ${view === v ? 'active' : ''}`}
          onClick={() => (setView(v), console.log('hee'))}
        >
          {v}
        </button>
      ))}
    </div>
  )
}
