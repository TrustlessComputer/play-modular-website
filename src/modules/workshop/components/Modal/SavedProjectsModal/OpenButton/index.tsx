import React from 'react'
import s from '../SavedProjectsModal.module.scss'
import { getProjectDetail, handleGetData } from '@/services/api/generative'
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks'
import { SAVED_PROJECTS_MODAL_ID } from '..'
import { accountSelector } from '@/stores/states/wallet/selector'
import { useAppSelector } from '@/stores/hooks'

type Props = {}

const OpenButton = (props: Props) => {
  const { selectedProject, loadProject } = useProjectStore()
  const { closeModal } = useModalStore()
  const { setDataCurrent } = useStoreGlobal()
  const account = useAppSelector(accountSelector)

  const handleClickOpen = async () => {
    try {
      const res = await getProjectDetail({ id: selectedProject.id })
      const data = await handleGetData(account.address) // reset data when open new data

      if (!!res.metaData) {
        setDataCurrent(data)
        loadProject({
          projectId: selectedProject.id,
          projectName: selectedProject.name,
          renderFile: res.metaData,
        })
        closeModal(SAVED_PROJECTS_MODAL_ID)
      }
    } catch (error) {
      //
    }
  }

  return (
    <button disabled={selectedProject.id === ''} className={`${s.button} btn_submit`} onClick={handleClickOpen}>
      Open
    </button>
  )
}

export default OpenButton