import React from 'react'
import AlertDialog from '@/components/AlertDialog'
import { useProjectStore, useStoreGlobal } from '@/stores/blocks'
import jsonFile from '@/modules/workshop/UI/Panel/BottomBar/mock.json'

type Props = {
  show: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UnsaveWarningModal = ({ show, setIsOpen }: Props) => {
  const { deleteAlls } = useStoreGlobal()

  const { createProject, saveProject, projectId, projectName } = useProjectStore()
  console.log('🚀 ~ UnsaveWarningModal ~ projectName:', projectName)
  console.log('🚀 ~ UnsaveWarningModal ~ projectId:', projectId)

  // update current json file
  const currentJsonFile = jsonFile

  const BodyModal = () => {
    return (
      <div>
        <p>You have unsave work. Save current work?</p>
        <div className='flex items-center justify-between'>
          <button
            onClick={() => {
              saveProject({
                projectId,
                projectName,
                jsonFile: currentJsonFile,
              })
              createProject()
              deleteAlls()
              setIsOpen(false)
            }}
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
    <AlertDialog isOpen={show} setIsOpen={setIsOpen}>
      <BodyModal />
    </AlertDialog>
  )
}

export default UnsaveWarningModal
