import React from 'react'
import s from './styles.module.scss'
import Image from 'next/image'
import Fade from '@/interactive/Fade'
import WalletButton from '@/components/WalletButton'
import { usePathname } from 'next/navigation'
import cn from 'classnames'

export default function Header() {
  const pathname = usePathname()
  const isWorkshop = pathname === '/workshop'

  return (
    <header className={s.header}>
      <div className={cn(isWorkshop ? s.containerWorkshop : s.container)}>
        <div className={`${s.logo} js-header-logo`}>
          <Image width={40} height={40} src={'imgs/logo.svg'} alt={'logo'} />
          <Fade delay={1}>Modular</Fade>
        </div>
        <WalletButton />
      </div>
    </header>
  )
}
