'use client'
import { IconClear, IconRedo, IconTrash, IconUndo } from '@/components/IconSvgs'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import IcCreate from '@/icons/workshop/ic-create.svg'
import IcOpen from '@/icons/workshop/ic-open.svg'
import { default as IcSave } from '@/icons/workshop/ic-save.svg'
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks'
import s from './styles.module.scss'

import useApiInfinite from '@/hooks/useApiInfinite'
import IcTwitter from '@/icons/workshop/ic-twitter.svg'
import IcPublish from '@/icons/workshop/ic-publish.svg'
import { getListModularByWallet, getProjectDetail, handleGetData, uploadFile } from '@/services/api/generative'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { TListCurrent } from '@/types'
import { useEffect, useMemo, useRef } from 'react'

type TDataFetch = {
  list: TListCurrent
}

import { WORKSHOP_URL } from '@/constant/route-path'
import SavedProjectsModal, { SAVED_PROJECTS_MODAL_ID } from '@/modules/workshop/components/Modal/SavedProjectsModal'
import SetProjectNameModal, { SET_PROJECT_NAME_MODAL_ID } from '@/modules/workshop/components/Modal/SetProjectNameModal'
import UnsaveWarningModal from '@/modules/workshop/components/Modal/UnsaveWarningModal'
import { EDIT_MODE, captureCanvasImage, copyShareTW, copyToClipboard } from '@/utils'
import { convertBase64ToFile } from '@/utils/file'
import { SHA256 } from 'crypto-js'
import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useSaveAction from '@/hooks/useSaveAction'
import InscribeButton from '@/components/InscribeButton'
import { DOMAIN_URL } from '@/constant/constant'

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

  const router = useRouter()

  const { setLoading, projectId, saveProject, createProject, projectName, renderFile, loadProject } = useProjectStore()

  const { openModal, modals } = useModalStore()

  const { isAllowSave, handleSaveFile, handleShareFile } = useSaveAction()

  const [showModal, setShowModal] = useState(false)
  const [showUnsaveModal, setShowUnsaveModal] = useState(false)
  const [showSetProjectNameModal, setShowSetProjectNameModal] = useState(false)
  const [clickView, setClickView] = useState(false)

  const account = useAppSelector(accountSelector)
  const isEditMode = mode === EDIT_MODE
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

  const saveAction = () => {
    handleSaveFile()
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

  // function copyShareTW(id: string) {
  //   copyToClipboard(`${DOMAIN_URL}/workshop/${id}`)
  //   toast.success(`Copied to clipboard`, { id: 'save-project-success' })
  //   setTimeout(() => {
  //     handleShareTw()
  //     setLoading(false)
  //   }, 2000)
  // }

  const viewAction = async () => {
    // if (!projectId) return

    // if (!projectId && isAllowSave) {
    //   openModal({
    //     id: SET_PROJECT_NAME_MODAL_ID,
    //     component: <SetProjectNameModal type='save-view' />,
    //   })
    //   return
    // }
    setLoading(true)
    if (isAllowSave) {
      const _projectId = await handleShareFile()
      if (!!_projectId && _projectId !== 'failed') {
        copyShareTW(_projectId, () => {
          handleShareTw()
          setLoading(false)
        })
      }
      return
    }

    if (!!projectId) {
      copyShareTW(projectId, () => {
        handleShareTw()
        setLoading(false)
      })
      return
    }
  }

  const loadInitialProject = async () => {
    try {
      setLoading(true)

      const res = await getProjectDetail({ id: projectId })
      // const data = await handleGetData(account.address) // reset data when open new data

      if (!!res.metaData) {
        // setDataCurrent(data)
        loadProject({
          projectId: projectId,
          projectName: projectName,
          renderFile: res.metaData,
        })
      }
    } catch (error) {
      //
    } finally {
      setLoading(false)
    }
  }

  useUndoRedoShortcut(undo, redo)

  useEffect(() => {
    if (renderFile) {
      loadDataAction(renderFile)
    }
  }, [renderFile])

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

  // useEffect(() => {
  //   if (projectId && projectName) {
  //     loadInitialProject()
  //   }
  // }, [projectId, projectName])

  const content = `Check out my on-chain LEGO masterpiece with Modular Workshop by @BVMnetwork 🧱 
    
With $BVM, just connect some Lego pieces and you have your own Bitcoin L2 blockchain 🤯🤯🤯
  
Join Modular Workshop and build the future of Bitcoin with me:
`

  const handleShareTw = () => {
    // e.preventDefault()
    // e.stopPropagation()
    // const shareUrl = `${DOMAIN_URL}/workshop/${projectId}`

    window.open(`https://twitter.com/BVMnetwork/status/1752952381007171646`, '_blank')
    // setTriggerSubmit(true);
    // setIsProcessing(true);
  }

  const handleDeleteSelected = () => {
    deleteSelected(selectedBricks)
    setSelectedBricks({})
  }

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />
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
          {isEditMode && (
            <button
              className={`${s.bottomBar_btn} ${selectedBricks.length === 0 && s.disable}`}
              disabled={selectedBricks.length === 0 && true}
              onClick={handleDeleteSelected}
            >
              <IconTrash />
            </button>
          )}
        </div>

        <div className={s.bottomBar}>
          <button className={`${s.bottomBar_btn} ${s.icon_X}`} onClick={viewAction}>
            <IcTwitter /> Share
          </button>
          <button className={s.bottomBar_btn} onClick={saveAction} disabled={!isAllowSave}>
            <IcSave /> Save
          </button>
          {/* <button className={s.bottomBar_btn} onClick={saveAsAction} disabled={!isAllowSave}>
            <IcSave /> Save As
          </button> */}
          <button className={s.bottomBar_btn} onClick={handleClickCreateNewProject}>
            <IcCreate /> New
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
          <InscribeButton className='h-[49px] px-5' />
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
