import React from 'react'
import s from '../SavedProjectsModal.module.scss'
import { getProjectDetail } from '@/services/api/generative'
import { useModalStore, useProjectStore } from '@/stores/blocks'
import { SAVED_PROJECTS_MODAL_ID } from '..'

type Props = {}

const OpenButton = (props: Props) => {
    const { selectedProject, loadProject } = useProjectStore()
    const { closeModal } = useModalStore()


    const handleClickOpen = async () => {
        try {
            const res = await getProjectDetail({ id: selectedProject.id })

            if (!!res.metaData) {
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