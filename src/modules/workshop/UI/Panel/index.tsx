import { ListBlocks } from './ListBlocks'
import ListBlocksApi from '@/modules/workshop/ListBlocksApi'

import s from './styles.module.scss'

export default function Panel() {
  return (
    <div className={s.panel}>
      <ListBlocks />
      <ListBlocksApi />
    </div>
  )
}
