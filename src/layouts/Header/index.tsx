import React from 'react'
import s from './styles.module.scss'
import IcHeader from '@/components/NbcLayout/Ioncs/IcHeader'

export default function Header() {
  return (
    <header className={s.header}>
      <IcHeader />
    </header>
  )
}
