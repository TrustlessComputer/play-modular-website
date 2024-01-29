'use client'
import { IconClear, IconRedo, IconTrash, IconUndo } from '@/components/IconSvgs'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import IcOpen from '@/icons/workshop/ic-open.svg'
import { default as IcCreate, default as IcSave } from '@/icons/workshop/ic-save.svg'
import { useProjectStore, useStoreGlobal } from '@/stores/blocks'
import s from './styles.module.scss'

import useApiInfinite from '@/hooks/useApiInfinite'
import { getListModularByWallet } from '@/services/api/generative'
import { TBlockData, TListCurrent } from '@/types'
import instance from '@/utils/storage/local-storage'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { handleConvertData } from '@/utils/convertTraits'
import { useEffect } from 'react'

type TDataFetch = {
  list: TListCurrent
}

import SavedProjectsModal from '@/modules/workshop/components/Modal/SavedProjectsModal'
import { useId, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import jsonFile from './mock.json'
import UnsaveWarningModal from '@/modules/workshop/components/Modal/UnsaveWarningModal'

const MOCK_ADDRESS = 'bc1p4psqwcglffqz87kl0ynzx26dtxvu3ep75a02d09fshy90awnpewqvkt7er'

export default function BottomBar() {
  const {
    undo,
    redo,
    mode,
    viewPreview,
    setViewPreview,
    deleteAlls,
    blockCurrent,
    setDataCurrent,
    setBlockCurrent,
    // deleteSeletBlocks,
  } = useStoreGlobal()

  const { projectId, saveProject, createProject, projectName } = useProjectStore()

  const [showModal, setShowModal] = useState(false)
  const [showUnsaveModal, setShowUnsaveModal] = useState(false)

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

  const undoAction = () => {
    undo()
  }

  const redoAction = () => {
    redo()
  }
  const deleteAction = () => {
    // deleteSeletBlocks()
  }
  const saveAction = async () => {
    if (blocksState.length < 2) return

    const payload: {
      jsonFile: any
      projectId?: string
      projectName?: string
      ownerAddress: string
    } = {
      jsonFile: jsonFile,
      ownerAddress: MOCK_ADDRESS, //account?.address,
    }

    if (projectId) {
      payload.projectId = projectId
    }

    if (projectName) {
      payload.projectName = projectName
    }

    saveProject(payload)
  }

  const loadDataAction = () => {
    /**
     * @todos Load Data
     */
    const dataJSON = instance.get('DATA_BLOCKS') as TBlockData[]
    setBlockCurrent(dataJSON)
  }

  const handleDeleteAll = () => {
    deleteAlls()
  }

  const handleGetData = async () => {
    const data = (await getListModularByWallet({
      ownerAddress: 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn',
      page: 1,
      limit: 20,
    })) as TDataFetch
    const convertData =
      Array.isArray(data.list) &&
      data.list.map((item) => {
        const traits = handleConvertData(item.attributes)
        return { ...item, traits }
      })
    setDataCurrent(convertData)
  }

  const handleClickCreateNewProject = () => {
    // if (blocksState.length > 2) {
    //   setShowUnsaveModal(true)
    // }
    createProject()
    deleteAlls()
  }

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
          <button className={s.bottomBar_btn} onClick={deleteAction}>
            <IconTrash /> Delete
          </button>

          <button className={s.bottomBar_btn} onClick={saveAction}>
            <IcSave /> Save Project
          </button>
          <button className={s.bottomBar_btn} onClick={saveAction}>
            <IcSave /> Save As
          </button>
          <button className={s.bottomBar_btn} onClick={handleClickCreateNewProject}>
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
        </div>
      </div>
      <SavedProjectsModal show={showModal} setIsOpen={setShowModal} />
      <UnsaveWarningModal show={showUnsaveModal} setIsOpen={setShowUnsaveModal} />
    </>
  )
}

/* <button onClick={() => setViewPreview(!viewPreview)} className={`${s.bottomBar_btn} ${s.bottomBar_btn_preview}`}>
        Preview: {viewPreview ? 'On' : 'Off'} <IconPreview />
      </button> */

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
