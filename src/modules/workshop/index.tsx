'use client'

import { useStoreGlobal } from '@/stores/blocks'
import Three3D from './Three3D'
import UI from './UI'
import PreviewRoom from './components/Preview'
import s from './styles.module.scss'
import cn from 'classnames'

export default function WorkShop() {
  const { viewPreview } = useStoreGlobal()

  return (
    <>
      <main className={s.workshop}>
        <div className={s.workshop_main}>
          <UI />
          <Three3D />
        </div>

        <div className={cn(s.workshop_preview, viewPreview ? s.display : '')}>
          <div className={s.preview_inner}>
            <PreviewRoom />
          </div>
        </div>
      </main>
    </>
  )
}
