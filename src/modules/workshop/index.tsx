'use client'

import { useProjectStore, useStoreGlobal } from '@/stores/blocks'
import Three3D from './Three3D'
import UI from './UI'
import PreviewRoom from './components/Preview'
import s from './styles.module.scss'
import cn from 'classnames'
import Spinner from '@/components/Spinner'

export default function WorkShop() {
  const { viewPreview } = useStoreGlobal()

  const { loading } = useProjectStore()

  return (
    <>
      <div className={`${s.overlay} ${loading ? 'z-[99999]' : 'z-0'}`}>
        <Spinner
          color='dark:text-transparent fill-gray-600'
        ></Spinner>
      </div>
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
