import React, { useEffect, useMemo, useRef } from 'react'
import { SHA256 } from 'crypto-js'
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks'
import SetProjectNameModal, { SET_PROJECT_NAME_MODAL_ID } from '@/modules/workshop/components/Modal/SetProjectNameModal'
import { captureCanvasImage } from '@/utils'
import { convertBase64ToFile } from '@/utils/file'
import { uploadFile } from '@/services/api/generative'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { TSaveTypes } from '@/interface/project'

const useSaveAction = (): {
  isAllowSave: boolean
  handleSaveFile: (type?: TSaveTypes) => Promise<string>
  handleShareFile: () => Promise<string>
} => {
  const account = useAppSelector(accountSelector)

  const { blockCurrent, blocksState } = useStoreGlobal()
  const { projectName, setLoading, projectId, saveProject } = useProjectStore()
  const { openModal } = useModalStore()

  const currentBlockStateRef = useRef(SHA256(JSON.stringify(blockCurrent)).toString() || '')

  const isAllowSave = useMemo(() => {
    const hashBlockCurrent = SHA256(JSON.stringify(blockCurrent)).toString()

    if (blocksState.length < 2) return false

    return hashBlockCurrent !== currentBlockStateRef.current
  }, [blockCurrent, blocksState.length, currentBlockStateRef.current])

  const handleSaveFile = async (type: TSaveTypes) => {
    if (!isAllowSave) return

    if (!projectName) {
      openModal({
        id: SET_PROJECT_NAME_MODAL_ID,
        component: <SetProjectNameModal type={type || 'save'} />,
      })
      return
    }
    setLoading(true)

    const { dataURL: image } = captureCanvasImage({})
    const file = convertBase64ToFile(image)
    const resUrl = await uploadFile({ file })

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
    const res = await saveProject(payload)
    currentBlockStateRef.current = SHA256(JSON.stringify(blockCurrent)).toString()
    setLoading(false)
    return res
  }

  const handleShareFile = async () => {
    const { dataURL: image } = captureCanvasImage({})
    const file = convertBase64ToFile(image)
    const resUrl = await uploadFile({ file })

    const payload: {
      jsonFile: any
      //   projectId?: string
      projectName?: string
      ownerAddress: string
      thumbnail: string
    } = {
      jsonFile: blockCurrent,
      ownerAddress: account?.address,
      thumbnail: resUrl.url,
      projectName: `${new Date().getTime()}`,
    }

    // if (projectId) {
    //   payload.projectId = projectId
    // }

    const res = await saveProject(payload)
    currentBlockStateRef.current = SHA256(JSON.stringify(blockCurrent)).toString()
    return res
  }

  return {
    isAllowSave,
    handleSaveFile,
    handleShareFile,
  }
}

export default useSaveAction
