import React from 'react'
import { useStoreGlobal } from '@/stores/blocks'
import { useDeleteShortcut } from '@/hooks/useShortcuts'

export const DeleteBrick = () => {
  const { selectedBricks, setSelectedBricks, deleteSelected } = useStoreGlobal()

  const onDelete = () => {
    deleteSelected(selectedBricks)
    setSelectedBricks({})
  }

  useDeleteShortcut(onDelete)

  return <></>
}
