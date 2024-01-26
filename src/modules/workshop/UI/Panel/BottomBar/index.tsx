'use client'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import { useStoreGlobal } from '@/stores/blocks'
import { views } from '@/utils'
import s from './styles.module.scss'
import { IconClear, IconPreview, IconRedo, IconTrash, IconUndo } from '@/components/IconSvgs'
import ListBlocksApi from '@/modules/workshop/ListBlocksApi'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import useApiInfinite from '@/hooks/useApiInfinite'
import { getListModularByWallet, saveProject } from '@/services/api/generative'
import { useEffect, useId } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import jsonFile from './mock.json'

const MOCK_ADDRESS = 'bc1p4psqwcglffqz87kl0ynzx26dtxvu3ep75a02d09fshy90awnpewqvkt7er'

export default function BottomBar() {
  const { undo, redo, mode, viewPreview, setViewPreview, deleteAlls } = useStoreGlobal()
  const account = useAppSelector(accountSelector)

  const id = useId()

  const {
    dataInfinite = [],
    isReachingEnd,
    loadMore,
  } = useApiInfinite(
    getListModularByWallet,
    {
      ownerAddress: MOCK_ADDRESS, //account?.address,
      page: 1,
      limit: 20,
    },
    {
      revalidateOnFocus: true,
      parallel: true,
      shouldFetch: !!account?.address,
    },
  )
  console.log('dataInfinite', dataInfinite)

  const undoAction = () => {
    undo()
  }

  const redoAction = () => {
    redo()
  }

  const saveAction = async () => {
    console.log('save')

    try {
      const res = await saveProject({
        id: id, // get from BE or auto generate
        name: 'test',
        jsonFile: JSON.stringify(jsonFile),
      })

      if (res) {
        toast.success('Saved successfully!')
      }
    } catch (error) {
      toast.error('Something went wrong! Please try again!')
      throw error
    }
  }

  const handleDeleteAll = () => {
    deleteAlls()
  }

  const handleGetData = async () => {
    const data = await getListModularByWallet({
      ownerAddress: 'bc1p4psqwcglffqz87kl0ynzx26dtxvu3ep75a02d09fshy90awnpewqvkt7er',
      page: 1,
      limit: 20,
    })
    console.log('getListModularByWallet: ', data)
  }
  useUndoRedoShortcut(undo, redo)

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <>
      <Toaster />
      <div className={s.bottomBar}>
        <button className={s.bottomBar_btn} onClick={undoAction}>
          <IconUndo /> Undo
        </button>
        <button className={s.bottomBar_btn} onClick={redoAction}>
          <IconRedo /> Redo
        </button>
        <button className={s.bottomBar_btn} onClick={() => handleDeleteAll()}>
          <IconClear />
          Clear
        </button>

        <button className={s.bottomBar_btn}>
          <IconTrash /> Delete
        </button>

        <button className={s.bottomBar_btn} onClick={saveAction}>
          Save
        </button>

        {/* <button onClick={() => setViewPreview(!viewPreview)} className={`${s.bottomBar_btn} ${s.bottomBar_btn_preview}`}>
        Preview: {viewPreview ? 'On' : 'Off'} <IconPreview />
      </button> */}
      </div>
    </>
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
