'use client'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import { useStoreGlobal } from '@/stores'
import { views } from '@/utils'
import s from './styles.module.scss'
export default function BottomBar() {
  const { undo, redo, mode, viewPreview, setViewPreview } = useStoreGlobal()
  // setBricks((bricks) => {
  //   const newBricks = bricks.filter((brick) => {
  //     const selectedClone = [...selectedBricks]
  //     const uID = brick.uID
  //     let should = true
  //     for (let i = 0; i < selectedClone.length; i++) {
  //       const selectedUID = selectedClone[i]
  //       if (uID === selectedUID) {
  //         should = false
  //         selectedClone.splice(i, 1)
  //       }
  //     }
  //     return should
  //   })
  //   return newBricks
  // })

  const undoAction = () => {
    undo()
  }

  const redoAction = () => {
    redo()
  }

  useUndoRedoShortcut(undo, redo)

  return (
    <div className={s.bottomBar}>
      <button className={s.bottomBar_btn} onClick={undoAction}>
        Undo
      </button>

      <button className={s.bottomBar_btn} onClick={redoAction}>
        Redo
      </button>

      <button
        //onClick={deleteSelectedBricks}
        className={s.bottomBar_btn}
      >
        Delete
      </button>

      <button onClick={() => setViewPreview(!viewPreview)} className={s.bottomBar_btn}>
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
