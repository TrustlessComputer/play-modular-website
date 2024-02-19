import React from 'react'
import s from '../SavedProjectsModal.module.scss'
import { getProjectDetail, handleGetData } from '@/services/api/generative'
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks'
import { SAVED_PROJECTS_MODAL_ID } from '..'
import { accountSelector } from '@/stores/states/wallet/selector'
import { useAppSelector } from '@/stores/hooks'
import { WalletType } from '@/providers/wallet/types'

type Props = {}

const OpenButton = (props: Props) => {
  const { selectedProject, loadProject, setLoading } = useProjectStore()
  const { closeModal } = useModalStore()
  const { setDataCurrent, setBlockCurrent } = useStoreGlobal()
  const account = useAppSelector(accountSelector)

  const handleClickOpen = async () => {
    try {
      setLoading(true)
      const res = await getProjectDetail({ id: selectedProject.id })
      const data = await handleGetData(account?.type === WalletType.GuestMode ? '' : account?.address) // reset data when open new data

      if (!!res.metaData) {
        setDataCurrent(data)
        loadProject({
          projectId: selectedProject.id,
          projectName: selectedProject.name,
          renderFile: res.metaData,
        })
        setBlockCurrent(JSON.parse(res.metaData))
        closeModal(SAVED_PROJECTS_MODAL_ID)
      }
    } catch (error) {
      //
    } finally {
      setLoading(false)
    }
  }

  return (
    <button disabled={selectedProject.id === ''} className={`${s.button} btn_submit`} onClick={handleClickOpen}>
      Open
    </button>
  )
}

export default OpenButton
