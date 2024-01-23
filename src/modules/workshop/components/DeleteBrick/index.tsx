import React from 'react'
import { useDeleteShortcut } from '@/utils'
import { useStoreGlobal } from '@/stores'

export const DeleteBrick = ({ setBricks }) => {
  const selected = useStoreGlobal((state) => state.selectedBricks).map((sel) => sel.userData.uID)
  const setSelection = useStoreGlobal((state) => state.setSelectedBricks)

  const onDelete = () => {
    setSelection({})
  }

  useDeleteShortcut(selected, setBricks, onDelete)

  return <></>
}
