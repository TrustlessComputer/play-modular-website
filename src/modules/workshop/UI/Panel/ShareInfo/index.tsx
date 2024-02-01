import React from 'react'
import s from './ShareInfo.module.scss'
import Link from 'next/link'
import IcClose from '@/icons/workshop/ic-close.svg'

type Props = {
  show: boolean
  onClose?: () => void
  showClose?: boolean
}

const ShareInfo = ({ show, onClose, showClose = false }: Props) => {
  if (!show) return null

  return (
    <div className={s.wrapper}>
      <div className='flex items-start justify-between'>
        <div>
          <p className={'font-bold'}>Share your on-chain LEGO masterpiece under this Tweet:</p>
          <Link
            target='_blank'
            href={'https://twitter.com/BVMnetwork/status/1752952381007171646'}
            className='underline'
          >
            https://twitter.com/BVMnetwork/status/1752952381007171646
          </Link>
        </div>
        {showClose && (
          <div onClick={onClose}>
            <IcClose />
          </div>
        )}
      </div>
      <p className='my-3'>The top 3 participants with the highest likes for their LEGO artworks will win the prizes:</p>
      <ul className={s.list}>
        <li>
          <b>1st Prize: </b>
          <Link
            target='_blank'
            className='underline'
            href={
              'https://magiceden.io/ordinals/item-details/ea283fe32ce8666960ec43febb6b09857c095f24b8a723140f57aacca34c35eci0'
            }
          >
            Bitcoin Punk Inscription #18108
          </Link>{' '}
          - one of the earliest Bitcoin Punk ever inscribed.
        </li>
        <li>
          <b>2nd Prize: </b>
          <Link
            target='_blank'
            className='underline'
            href={
              'https://magiceden.io/ordinals/item-details/3b6490361d54ad495323c246c0dc0c82f1a78a5c443fc2d3e52f703102bc8c2ci0'
            }
          >
            Modular #305
          </Link>{' '}
          - a super Rare Inscription in Modular Collection
        </li>
        <li>
          <b>3rd Prize: </b>
          <Link
            target='_blank'
            className='underline'
            href={
              'https://magiceden.io/ordinals/item-details/231b8fec3ae355d083d81d497bdae31d14379c2820237ecb5fc32424fa1c3401i0'
            }
          >
            Modular #81
          </Link>{' '}
          - inscription in Modular Collection
        </li>
      </ul>
    </div>
  )
}

export default ShareInfo
