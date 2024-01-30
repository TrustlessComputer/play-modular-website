import Link from 'next/link'
import s from './styles.module.scss'

import WalletButton from '@/components/WalletButton'
import Fade from '@/interactive/Fade'
import cn from 'classnames'
import { usePathname } from 'next/navigation'
import LogoIcon from '/public/imgs/logo.svg'

const MODULAR_TEXT = 'Modular'

export default function Header() {
  const pathname = usePathname()
  const isWorkshop = pathname === '/workshop'

  return (
    <header className={s.header}>
      <div className={cn(isWorkshop ? s.containerWorkshop : s.container)}>
        <div className={`${s.logo} js-header-logo`}>
          <Link href='/' className='inline-flex justify-center items-center gap-[16px]'>
            <LogoIcon />
            {pathname === '/' ? <Fade delay={1}>{MODULAR_TEXT}</Fade> : <div>{MODULAR_TEXT}</div>}
          </Link>
        </div>
        <WalletButton />
      </div>
    </header>
  )
}
