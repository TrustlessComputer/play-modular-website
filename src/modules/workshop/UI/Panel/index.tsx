import { ListBlocks } from './ListBlocks'
import s from './styles.module.scss'

export default function Panel() {
  return (
    <div className={s.panel}>
      <ListBlocks />
    </div>
  )
}
