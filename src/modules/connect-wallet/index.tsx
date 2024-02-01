'use client'
import Image from 'next/image'
import React from 'react'
import cn from 'classnames'

import useConnectWalletModal from '@/hooks/useConnectWalletModal'
import { WalletType } from '@/providers/wallet/types'
import useWalletContext from '@/providers/wallet/useWalletContext'

import s from './styles.module.scss'

const ConnectWallet: React.FunctionComponent = () => {
  const { openConnectWalletModal } = useConnectWalletModal()
  const walletCtx = useWalletContext()

  return (
    <div className={s.connectWallet}>
      <Image src='/imgs/group-block.png' width={723} height={384} alt='blocks' />
      <div className='flex flex-col gap-[16px]'>
        <button className={s.connectWallet_btn} onClick={openConnectWalletModal}>
          Connect Wallet
        </button>
        <button
          className={cn(s.connectWallet_btn, s.connectWallet_guestMode)}
          onClick={() => {
            walletCtx.requestAccount({ walletType: WalletType.GuestMode }).then()
          }}
        >
          <div>
            <Image src='/imgs/wallet/guest-mode.svg' width={20} height={20} alt='guest-mode' />
          </div>
          Guest Mode
        </button>
      </div>
    </div>
  )
}

export default ConnectWallet
