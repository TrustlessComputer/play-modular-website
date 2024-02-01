import React from 'react'
import AlertDialog from '@/components/AlertDialog'
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks'
import SetProjectNameModal, { SET_PROJECT_NAME_MODAL_ID } from '../SetProjectNameModal'
import useSaveAction from '@/hooks/useSaveAction'

type Props = {
  show: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UnsaveWarningModal = ({ show, setIsOpen }: Props) => {
  const { deleteAlls } = useStoreGlobal()

  const { createProject, saveProject, projectId, projectName } = useProjectStore()

  const { openModal } = useModalStore()

  const { isAllowSave, handleSaveFile } = useSaveAction()

  // update current json file

  const BodyModal = () => {
    return (
      <div>
        <p>You have unsave work. Save current work?</p>
        <div className='flex items-center justify-between mt-6'>
          <button
            onClick={async () => {
              const res = await handleSaveFile('save-exit')
              if (!!res && res !== 'failed') {
                createProject()
                deleteAlls()
                setIsOpen(false)
              }
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

  if (!show || !isAllowSave) return null

  return (
    <AlertDialog isOpen={show} closeModal={() => setIsOpen(false)}>
      <BodyModal />
    </AlertDialog>
  )
}

export default UnsaveWarningModal
