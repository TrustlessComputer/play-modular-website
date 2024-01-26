'use client'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import { useProjectStore, useStoreGlobal } from '@/stores/blocks'
import { views } from '@/utils'
import s from './styles.module.scss'
import { IconClear, IconPreview, IconRedo, IconTrash, IconUndo } from '@/components/IconSvgs'
import IcSave from '@/icons/workshop/ic-save.svg'
import IcCreate from '@/icons/workshop/ic-save.svg'
import IcOpen from '@/icons/workshop/ic-open.svg'

import ListBlocksApi from '@/modules/workshop/ListBlocksApi'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import useApiInfinite from '@/hooks/useApiInfinite'
import { getListModularByWallet, saveProject } from '@/services/api/generative'
import { useEffect, useId, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import jsonFile from './mock.json'
import SavedProjectsModal from '@/modules/workshop/components/Modal/SavedProjectsModal'

const MOCK_ADDRESS = 'bc1p4psqwcglffqz87kl0ynzx26dtxvu3ep75a02d09fshy90awnpewqvkt7er'

export default function BottomBar() {
  const { undo, redo, mode, viewPreview, setViewPreview, deleteAlls } = useStoreGlobal()

  const { projectId, saveProject, createProject } = useProjectStore()

  const [showModal, setShowModal] = useState(false)
  console.log('🚀 ~ BottomBar ~ showModal:', showModal)

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
    saveProject({
      projectId: id,
      projectName: 'test',
      jsonFile: jsonFile,
    })
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

  const handleOpenSavedProjectModal = () => {}

  useUndoRedoShortcut(undo, redo)

  useEffect(() => {
    handleGetData()
  }, [])

  // First load, trigger create new project
  useEffect(() => {
    if (!projectId) {
      createProject()
    }
  }, [projectId, createProject])

  return (
    <>
      <Toaster />
      <div className={s.wrapper}>
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

          {/* <button onClick={() => setViewPreview(!viewPreview)} className={`${s.bottomBar_btn} ${s.bottomBar_btn_preview}`}>
        Preview: {viewPreview ? 'On' : 'Off'} <IconPreview />
      </button> */}
        </div>
        <div className={s.bottomBar}>
          <button className={s.bottomBar_btn} onClick={saveAction}>
            <IcSave /> Save Project
          </button>
          <button className={s.bottomBar_btn} onClick={saveAction}>
            <IcSave /> Save As
          </button>
          <button className={s.bottomBar_btn} onClick={createProject}>
            <IcCreate /> Create New
          </button>
          <button
            className={s.bottomBar_btn}
            onClick={() => {
              setShowModal(true)
            }}
          >
            <IcOpen /> Open Project
          </button>

          {/* <button onClick={() => setViewPreview(!viewPreview)} className={`${s.bottomBar_btn} ${s.bottomBar_btn_preview}`}>
        Preview: {viewPreview ? 'On' : 'Off'} <IconPreview />
      </button> */}
        </div>
      </div>
      <SavedProjectsModal
        show={showModal}
        onClose={() => {
          console.log('click onClose')
          setShowModal(false)
        }}
      />
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
