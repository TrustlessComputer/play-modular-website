'use client'
import { IconClear, IconRedo, IconTrash, IconUndo } from '@/components/IconSvgs'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import IcOpen from '@/icons/workshop/ic-open.svg'
import { default as IcCreate, default as IcSave } from '@/icons/workshop/ic-save.svg'
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks'
import s from './styles.module.scss'

import useApiInfinite from '@/hooks/useApiInfinite'
import { getListModularByWallet, handleGetData } from '@/services/api/generative'
import { TBlockData, TListCurrent } from '@/types'
import instance from '@/utils/storage/local-storage'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { handleConvertData } from '@/utils/convertTraits'
import { useEffect, useMemo, useRef } from 'react'

type TDataFetch = {
  list: TListCurrent
}

import SavedProjectsModal, { SAVED_PROJECTS_MODAL_ID } from '@/modules/workshop/components/Modal/SavedProjectsModal'
import { useId, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import jsonFile from './mock.json'
import UnsaveWarningModal from '@/modules/workshop/components/Modal/UnsaveWarningModal'
import SetProjectNameModal, { SET_PROJECT_NAME_MODAL_ID } from '@/modules/workshop/components/Modal/SetProjectNameModal'
import { SHA256 } from 'crypto-js'

// const MOCK_ADDRESS = 'bc1p4psqwcglffqz87kl0ynzx26dtxvu3ep75a02d09fshy90awnpewqvkt7er'

export default function BottomBar() {
  const {
    undo,
    redo,
    mode,
    viewPreview,
    setViewPreview,
    deleteAlls,
    setDataCurrent,
    setBlockCurrent,
    blocksState,
    selectedBricks,
    // deleteSeletBlocks,
    deleteSelected,
    setSelectedBricks,
    setBricks,
    blockCurrent,
    setBlockCurrentUpdate,
  } = useStoreGlobal()

  const { projectId, saveProject, createProject, projectName, renderFile } = useProjectStore()

  const { openModal, modals } = useModalStore()

  const [showModal, setShowModal] = useState(false)
  const [showUnsaveModal, setShowUnsaveModal] = useState(false)
  const [showSetProjectNameModal, setShowSetProjectNameModal] = useState(false)

  const currentBlockStateRef = useRef(SHA256(JSON.stringify(blocksState)).toString() || '')

  console.log('🚀 ~ BottomBar ~ currentBlockStateRef:', currentBlockStateRef)

  const account = useAppSelector(accountSelector)

  const id = useId()

  const {
    dataInfinite = [],
    isReachingEnd,
    loadMore,
  } = useApiInfinite(
    getListModularByWallet,
    {
      ownerAddress: account?.address,
      // ownerAddress: 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn',
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

  const isAllowSave = useMemo(() => {
    const hashBlockState = SHA256(JSON.stringify(blocksState)).toString()

    return hashBlockState !== currentBlockStateRef.current && blocksState.length > 1
  }, [blocksState])

  const saveAction = async () => {
    if (!isAllowSave) return

    if (!projectName) {
      openModal({
        id: SET_PROJECT_NAME_MODAL_ID,
        component: <SetProjectNameModal type='save' />,
      })
      return
    }

    const payload: {
      jsonFile: any
      projectId?: string
      projectName?: string
      ownerAddress: string
    } = {
      jsonFile: blockCurrent,
      ownerAddress: account?.address,
    }

    if (projectId) {
      payload.projectId = projectId
    }

    if (projectName) {
      payload.projectName = projectName
    }
    console.log('payload', JSON.stringify(payload.jsonFile))
    saveProject(payload)
  }

  const saveAsAction = async () => {
    if (!isAllowSave) return

    openModal({
      id: SET_PROJECT_NAME_MODAL_ID,
      component: <SetProjectNameModal type='save-as' />,
    })
    return
  }

  const loadDataAction = (file) => {
    /**
     * @todos Load Data
     */
    const dataJSON = JSON.parse(file)
    setBlockCurrent(dataJSON)
  }

  const handleDeleteAll = () => {
    deleteAlls()
  }

  // const handleGetData = async () => {
  //   const data = (await getListModularByWallet({
  //     ownerAddress: account?.address,
  //     // ownerAddress: 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn',
  //     page: 1,
  //     limit: 20,
  //   })) as any
  //   const listData = data.list as TListCurrent[]
  //   return listData
  // }

  const handleClickCreateNewProject = async () => {
    if (isAllowSave) {
      setShowUnsaveModal(true)
      return
    }
    createProject()
    deleteAlls()
    const data = await handleGetData(account?.address) //reset new project
    setDataCurrent(data)
  }

  useUndoRedoShortcut(undo, redo)

  useEffect(() => {
    if (renderFile) {
      loadDataAction(renderFile)
    }
  }, [renderFile])

  // First load, trigger create new project
  useEffect(() => {
    if (!projectId) {
      createProject()
    }
  }, [projectId, createProject])

  useEffect(() => {
    // detect click browser back button or closing tab
    if (!isAllowSave) return
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
    })

    return () => {
      window.removeEventListener('beforeunload', (e) => {
        e.preventDefault()
      })
    }
  }, [isAllowSave])

  const handleDeleteSelected = () => {
    deleteSelected(selectedBricks)
    setSelectedBricks({})
  }

  return (
    <>
      <Toaster />
      <div className={s.wrapper}>
        <div className={s.bottomBar}>
          <button className={`${s.bottomBar_btn} ${s.noFill}`} onClick={undoAction}>
            <IconUndo />
          </button>
          <button className={`${s.bottomBar_btn} ${s.noFill}`} onClick={redoAction}>
            <IconRedo />
          </button>
          <button className={s.bottomBar_btn} onClick={() => handleDeleteAll()}>
            <IconClear />
          </button>
          <button
            className={`${s.bottomBar_btn} ${selectedBricks.length === 0 && s.disable}`}
            disabled={selectedBricks.length === 0 && true}
            onClick={handleDeleteSelected}
          >
            <IconTrash />
          </button>
        </div>

        <div className={s.bottomBar}>
          <button className={s.bottomBar_btn} onClick={saveAction} disabled={!isAllowSave}>
            <IcSave /> Save
          </button>
          <button className={s.bottomBar_btn} onClick={saveAsAction} disabled={!isAllowSave}>
            <IcSave /> Save As
          </button>
          <button className={s.bottomBar_btn} onClick={handleClickCreateNewProject}>
            <IcCreate /> Create New
          </button>
          <button
            className={s.bottomBar_btn}
            onClick={() => {
              openModal({
                id: SAVED_PROJECTS_MODAL_ID,
                component: <SavedProjectsModal />,
              })
            }}
          >
            <IcOpen /> Open
          </button>
        </div>
      </div>
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
