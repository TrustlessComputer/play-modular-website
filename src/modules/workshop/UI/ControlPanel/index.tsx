'use client'

import React from 'react'

import styles from './styles.module.scss'
import { RotateIcon } from '@/components/IconSvgs'
import { useStoreGlobal } from '@/stores/blocks'
import { degToRad } from '@/utils'

const ControlPanel = () => {
  const { selectedBricks, setBlockCurrent, blockCurrent } = useStoreGlobal()
  const isSelected = selectedBricks.length > 0

  const handleRotate = () => {
    const blockCurrentClone = [...blockCurrent]

    for (let i = 0; i < blockCurrentClone.length; i++) {
      for (let j = 0; j < selectedBricks.length; j++) {
        if (blockCurrentClone[i].uID === selectedBricks[j].userData.uID) {
          blockCurrentClone[i].rotation -= Math.PI / 2
          break
        }
      }
    }

    setBlockCurrent(blockCurrentClone)
  }

  return (
    isSelected && (
      <div className={styles.wrapper}>
        <button className={styles.item} onClick={handleRotate}>
          <RotateIcon />
        </button>
      </div>
    )
  )
}

export default ControlPanel
