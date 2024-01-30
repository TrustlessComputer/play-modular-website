import React from 'react'
import s from './styles.module.scss'
import Link from 'next/link'

import Fade from '@/interactive/Fade'
import WalletButton from '@/components/WalletButton'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import LogoIcon from '/public/imgs/logo.svg'

export default function Header() {
  const pathname = usePathname()
  const isWorkshop = pathname === '/workshop'

  return (
    <header className={s.header}>
      <div className={cn(isWorkshop ? s.containerWorkshop : s.container)}>
        <div className={`${s.logo} js-header-logo`}>
          <Link href='/'>
            <LogoIcon />
          </Link>
          <Fade delay={1}>Modular</Fade>
        </div>
        <WalletButton />
      </div>
    </header>
  )
}
