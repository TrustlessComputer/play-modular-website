import React from 'react'
import AlertDialog from '@/components/AlertDialog'
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks'
import jsonFile from '@/modules/workshop/UI/Panel/BottomBar/mock.json'
import SetProjectNameModal, { SET_PROJECT_NAME_MODAL_ID } from '../SetProjectNameModal'

type Props = {
  show: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UnsaveWarningModal = ({ show, setIsOpen }: Props) => {
  const { deleteAlls } = useStoreGlobal()

  const { createProject, saveProject, projectId, projectName } = useProjectStore()

  const { openModal } = useModalStore()

  // update current json file
  const currentJsonFile = jsonFile

  const BodyModal = () => {
    return (
      <div>
        <p>You have unsave work. Save current work?</p>
        <div className='flex items-center justify-between mt-6'>
          <button
            onClick={() => {

              setIsOpen(false)

              openModal({
                id: SET_PROJECT_NAME_MODAL_ID,
                component: <SetProjectNameModal type='save-exit' />,
              })
              return

            }}
            className='btn_submit'
          >
            Yes
          </button>
          <button
            onClick={() => {
              createProject()
              deleteAlls()
              setIsOpen(false)
            }}
          >
            No, create new project
          </button>
        </div>
      </div>
    )
  }

  if (!show) return null

  return (
    <AlertDialog isOpen={show} closeModal={() => setIsOpen(false)}>
      <BodyModal />
    </AlertDialog>
  )
}

export default UnsaveWarningModal
