import React from 'react'
import Panel from './Panel'
import ModeToggleBar from './ModeToggleBar'
import { ListBlocks } from './Panel/ListBlocks'

export default function UI() {
  return (
    <>
      <ModeToggleBar />
      <ListBlocks />
      <Panel />
    </>
  )
}
