'use client'
import { IconClear, IconRedo, IconTrash, IconUndo } from '@/components/IconSvgs'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import IcOpen from '@/icons/workshop/ic-open.svg'
import { default as IcSave } from '@/icons/workshop/ic-save.svg'
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks'
import s from './styles.module.scss'
import IcCreate from '@/icons/workshop/ic-create.svg'

import useApiInfinite from '@/hooks/useApiInfinite'
import { getListModularByWallet, getProjectDetail, handleGetData, uploadFile } from '@/services/api/generative'
import { TBlockData, TListCurrent } from '@/types'
import instance from '@/utils/storage/local-storage'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { handleConvertData } from '@/utils/convertTraits'
import { useEffect, useMemo, useRef } from 'react'
import IcEye from '@/icons/workshop/ic-eye.svg'

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
import { convertBase64ToFile } from '@/utils/file'
import { WORKSHOP_URL } from '@/constant/route-path'
import { useRouter } from 'next/navigation'
import { DELAY_SNAPSHOT } from '@/constant/constant'
import { EDIT_MODE } from '@/utils'

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

  const [showModal, setShowModal] = useState(false)
  const [showUnsaveModal, setShowUnsaveModal] = useState(false)
  const [showSetProjectNameModal, setShowSetProjectNameModal] = useState(false)
  const [clickView, setClickView] = useState(false)

  const currentBlockStateRef = useRef(SHA256(JSON.stringify(blockCurrent)).toString() || '')

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

  const isAllowSave = useMemo(() => {
    const hashBlockCurrent = SHA256(JSON.stringify(blockCurrent)).toString()

    return hashBlockCurrent !== currentBlockStateRef.current
  }, [blockCurrent])

  const saveAction = async () => {
    // saveToPng()

    if (!isAllowSave) return

    if (!projectName) {
      openModal({
        id: SET_PROJECT_NAME_MODAL_ID,
        component: <SetProjectNameModal type='save' />,
      })
      return
    }
    setLoading(true)

    const wrapperDom = document.querySelector('.styles_workshop_preview__cFkSM') // TODO: Pass ref to
    // if (e.ctrlKey && e.key === 's') {
    ;(wrapperDom as HTMLElement).style.display = 'block'
    ;(wrapperDom as HTMLElement).style.position = 'fixed'
    ;(wrapperDom as HTMLElement).style.top = '0'
    ;(wrapperDom as HTMLElement).style.left = '0'
    ;(wrapperDom as HTMLElement).style.right = '0'
    ;(wrapperDom as HTMLElement).style.bottom = '0'

    const canvas = wrapperDom.querySelector('canvas')
    canvas.classList.add(s.saveMove)

    setTimeout(async () => {
      const image = canvas.toDataURL('image/png')
      const file = convertBase64ToFile(image)
      const resUrl = await uploadFile({ file })
      const a = document.createElement('a')
      a.href = image
      a.download = 'project-xxxx.png'
      // a.click()
      a.remove()

      canvas.classList.remove(s.saveMove)
      ;(wrapperDom as HTMLElement).style.display = 'none'

      const payload: {
        jsonFile: any
        projectId?: string
        projectName?: string
        ownerAddress: string
        thumbnail: string
      } = {
        jsonFile: blockCurrent,
        ownerAddress: account?.address,
        thumbnail: resUrl.url,
      }

      if (projectId) {
        payload.projectId = projectId
      }

      if (projectName) {
        payload.projectName = projectName
      }
      await saveProject(payload)

      setLoading(false)
    }, DELAY_SNAPSHOT)
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

  const viewAction = async () => {
    if (!projectId && !isAllowSave) return

    if (!projectId && isAllowSave) {
      openModal({
        id: SET_PROJECT_NAME_MODAL_ID,
        component: <SetProjectNameModal type='save-view' />,
      })
      return
    }

    if (isAllowSave) {
      await saveAction()
      setLoading(true)
      setTimeout(() => {
        router.push(`${WORKSHOP_URL}/${projectId}`)
      }, 3000)
      return
    }
    router.push(`${WORKSHOP_URL}/${projectId}`)
  }

  const loadInitialProject = async () => {
    try {
      setLoading(true)
      const res = await getProjectDetail({ id: projectId })
      const data = await handleGetData(account.address) // reset data when open new data

      if (!!res.metaData) {
        setDataCurrent(data)
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

  useEffect(() => {
    if (projectId && projectName) {
      loadInitialProject()
    }
  }, [projectId, projectName])

  // useEffect(() => {

  //   window.addEventListener('keydown', saveToPng)
  //   return () => {
  //     window.removeEventListener('keydown', saveToPng)
  //   }
  // }, [])

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
          <button className={s.bottomBar_btn} onClick={viewAction}>
            <IcEye /> View Mode
          </button>
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
