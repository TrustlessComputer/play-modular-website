import React from 'react'
import { useStoreGlobal } from '@/stores/blocks'
import { useDeleteShortcut } from '@/hooks/useShortcuts'

export const DeleteBrick = ({ setBricks }) => {
  const selected = useStoreGlobal((state) => state.selectedBricks).map((sel) => sel.userData.uID)
  const setSelection = useStoreGlobal((state) => state.setSelectedBricks)

  const onDelete = () => {
    setSelection({})
  }

  useDeleteShortcut(selected, setBricks, onDelete)
  return <></>
}
