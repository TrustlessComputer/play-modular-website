import BottomBar from './BottomBar'
// import { ListBlocks } from './ListBlocks'
import ListBlocksApi from '@/modules/workshop/ListBlocksApi'

import s from './styles.module.scss'
import cn from 'classnames'
import ModeToggleBar from '../ModeToggleBar'
import ControlPanel from '../ControlPanel'

export default function Panel() {
  return (
    <div className={cn('container', s.panel)}>
      {/* <ListBlocks /> */}
      <ModeToggleBar />
      <ListBlocksApi />
      <BottomBar />
      {/* <ControlPanel /> */}
    </div>
  )
}
