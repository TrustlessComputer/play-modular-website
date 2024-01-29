'use client'
import React from 'react'
import cn from 'classnames'
import useConnectWalletModal from '@/hooks/useConnectWalletModal'

import s from './styles.module.scss'

const Empty: React.FunctionComponent<{ className?: string }> = ({ className }) => {
  const { openConnectWalletModal } = useConnectWalletModal()

  return (
    <div className={cn(s.empty, className)}>
      <div className={s.empty_text}>Sorry! Your account have 0 bricks</div>
      <div className='flex flex-col gap-[12px]'>
        <button className={s.empty_btn} onClick={openConnectWalletModal}>
          Connect Other wallet
        </button>
        <a className={s.empty_btn} target='_blank' href='https://generative.xyz/generative/1004094'>
          Mint
        </a>
      </div>
    </div>
  )
}

export default Empty
