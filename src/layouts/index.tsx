'use client'

import React, { ReactNode, useEffect } from 'react'
import Header from './Header'
import { usePathname } from 'next/navigation'
import useAnimationStore from '@/stores/useAnimationStore'
import ModalManager from '@/modules/modal-manager'

export default function Layout({ children }: { children: ReactNode }) {
  const pathName = usePathname()
  const { resetPlay } = useAnimationStore()
  useEffect(() => {
    resetPlay()
  }, [pathName])

  return (
    <>
      <Header />
      <ModalManager />

      {children}
    </>
  )
}
