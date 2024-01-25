'use client'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import { useStoreGlobal } from '@/stores/blocks'
import { views } from '@/utils'
import s from './styles.module.scss'
import { IconClear, IconPreview, IconRedo, IconTrash, IconUndo } from '@/components/IconSvgs'

export default function BottomBar() {
  const { undo, redo, mode, viewPreview, setViewPreview, deleteAlls } = useStoreGlobal()
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

  const saveAction = () => {
    console.log('save')
  }

  const handleDeleteAll = () => {
    deleteAlls()
  }

  useUndoRedoShortcut(undo, redo)

  return (
    <div className={s.bottomBar}>
      <button className={s.bottomBar_btn} onClick={undoAction}>
        <IconUndo /> Undo
      </button>
      <button className={s.bottomBar_btn} onClick={redoAction}>
        <IconRedo /> Redo
      </button>
      <button className={s.bottomBar_btn}>
        <IconClear />
        Clear
      </button>

      <button className={s.bottomBar_btn} onClick={() => handleDeleteAll()}>
        <IconTrash /> Delete
      </button>

      <button className={s.bottomBar_btn} onClick={saveAction}>
        Save
      </button>

      <button onClick={() => setViewPreview(!viewPreview)} className={`${s.bottomBar_btn} ${s.bottomBar_btn_preview}`}>
        Preview: {viewPreview ? 'On' : 'Off'} <IconPreview />
      </button>
    </div>
  )
}
// const allViews = Object.values(views)

// BottomBar.PreviewScene = function BottomBarPreviewScene() {
//   const { view, setView } = useStoreGlobal()

//   return (
//     <div className={s.bottomBar_changeView}>
//       {allViews.map((v) => (
//         <button
//           key={v}
//           className={`${s.bottomBar_changeView_btn} ${view === v ? s.active : ''}`}
//           onClick={() => setView(v)}
//         >
//           {v}
//         </button>
//       ))}
//     </div>
//   )
// }
