import { useStoreGlobal } from '@/stores'
import Three3D from './Three3D'
import UI from './UI'
import PreviewRoom from './components/Preview'
import s from './styles.module.scss'

export default function WorkShop() {
  const { viewPreview } = useStoreGlobal()

  return (
    <main className={s.workshop}>
      <div className={s.workshop_main}>
        <UI />
        <Three3D />
      </div>
      {viewPreview && (
        <div className={s.workshop_preview}>
          {' '}
          <PreviewRoom />
        </div>
      )}
    </main>
  )
}
