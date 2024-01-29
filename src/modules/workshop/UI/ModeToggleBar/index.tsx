'use client'
import React from 'react'
import { useStoreGlobal } from '@/stores/blocks'
import { CREATE_MODE, EDIT_MODE } from '@/utils'
import s from './styles.module.scss'

export default function ModeToggleBar() {
  const { setMode, mode } = useStoreGlobal()

  return (
    <div className={s.toggleBar} aria-label='Text alignment'>
      <div
        className={`${s.toggleBar_item} ${mode === CREATE_MODE && s.toggleBar_item_isActive} `}
        aria-label={CREATE_MODE}
        onClick={() => setMode(CREATE_MODE)}
      >
        {CREATE_MODE}
      </div>
      <div
        className={`${s.toggleBar_item} ${mode === EDIT_MODE && s.toggleBar_item_isActive} `}
        aria-label={EDIT_MODE}
        onClick={() => setMode(EDIT_MODE)}
      >
        {EDIT_MODE}
      </div>
    </div>
  )
}
