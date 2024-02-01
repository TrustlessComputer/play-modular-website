import React from 'react'
import IcBitcoin from '@/icons/workshop/ic-bitcoin.svg'
import s from './InscribeButton.module.scss'
import cs from 'classnames'

type Props = {
  className?: string
}

const InscribeButton = ({ className }: Props) => {
  return (
    <button className={cs(s.button, className)}>
      <IcBitcoin />
      <p className='flex items-center'>
        <span>Inscribe Your Build</span>
        <span className={s.subText}>(Soon)</span>
      </p>
    </button>
  )
}

export default InscribeButton
