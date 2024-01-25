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

  const saveAction = () => {
    console.log('save')
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
      <button className={s.bottomBar_btn}>Clear</button>

      <button className={s.bottomBar_btn}>Delete</button>

      <button className={s.bottomBar_btn} onClick={saveAction}>
        Save
      </button>

      {/* <button onClick={() => setViewPreview(!viewPreview)} className={s.bottomBar_btn}>
        Preview
      </button> */}
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
